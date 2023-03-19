/*
Surge配置参考注释
----------------------------------------
[Script]
Sub_Info_Panel = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/mieqq/mieqq/master/sub_info_panel.js,script-update-interval=0,argument=url=[URL encode 后的机场节点链接]&reset_day=1&title=AmyInfo&icon=bonjour&color=#007aff
[Panel]
Sub_Info_Panel = script-name=Sub_Info_Panel,update-interval=600
----------------------------------------
先将带有流量信息的节点订阅链接encode，用encode后的链接替换"url="后面的[机场节点链接]
可选参数 &reset_day，后面的数字替换成流量每月重置的日期，如1号就写1，8号就写8。如"&reset_day=8",不加该参数不显示流量重置信息。
可选参数 &expire，机场链接不带expire信息的，可以手动传入expire参数，如"&expire=2022-02-01",注意一定要按照yyyy-MM-dd的格式。不希望显示到期信息也可以添加&expire=false取消显示。
可选参数"title=xxx" 可以自定义标题。
可选参数"icon=xxx" 可以自定义图标，内容为任意有效的 SF Symbol Name，如 bolt.horizontal.circle.fill，详细可以下载app https://apps.apple.com/cn/app/sf-symbols-browser/id1491161336
可选参数"color=xxx" 当使用 icon 字段时，可传入 color 字段控制图标颜色，字段内容为颜色的 HEX 编码。如：color=#007aff
----------------------------------------
*/

let args = getArgs();

(async () => {
  try {
    let info = await getDataInfo(args.url);
    if (!info) $done();
    let resetDayLeft = getRemainingDays(parseInt(args["reset_day"]));
    let day = "Days";
    resetDayLeft < 2 ? day = day.replace(day[3], '\0') : day = day.replace(day[3], 's');

    let used = info.download + info.upload;
    let total = info.total;
    let expire = args.expire || info.expire;
    let content = [`${bytesToSize(used)} ⧸ ${bytesToSize(total)}`];

    if (resetDayLeft || (expire && expire !== "false")) {
      if (/^[\d.]+$/.test(expire)) expire *= 1000;
      content.push(resetDayLeft 
                  ? `${resetDayLeft} ${day} · ${formatTime(expire)}`
                  : `${formatTime(expire)}`
                  );
    }

    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    hour = hour > 9 ? hour : "0" + hour;
    minutes = minutes > 9 ? minutes : "0" + minutes;

    $done({
      title: `${args.title}`,
      content: content.join("\n"),
      icon: args.icon,
      "icon-color": args.color,
    });
  } catch (err) {
    console.log(err);
    $done();
  }
})();

function getArgs() {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}

function getResponseHeader(url) {
  let method = args.method || "head";
  let request = { headers: { "User-Agent": "Quantumult X" }, url };
  return new Promise((resolve, reject) =>
    $httpClient[method](request, (err, resp) => {
      if (err != null) {
        reject(err);
        return;
      }
      if (resp.status !== 200) {
        reject(resp.status);
        return;
      }
      let header = Object.keys(resp.headers).find(
        (key) => key.toLowerCase() === "subscription-userinfo"
      );
      if (header) {
        resolve(resp.headers[header]);
        return;
      }
      reject("链接响应头不带有流量信息");
    })
  );
}

async function getDataInfo(url) {
  const [err, data] = await getResponseHeader(url)
    .then((data) => [null, data])
    .catch((err) => [err, null]);
  if (err) {
    console.log(err);
    return;
  }

  return Object.fromEntries(
    data
      .match(/(\b\w+\b=\d+\.?\d*)/g)
      .map((item) => item.split("="))
      .map(([k, v]) => [k, Number(v)])
  );
}

function getRemainingDays(resetDay) {
  if (!resetDay) return;

  let now = new Date();
  let daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  let remainingDays = resetDay - now.getDate() + 1;
  return remainingDays > 0 ? remainingDays : remainingDays + daysInMonth;
}

function bytesToSize(bytes) {
  if (bytes === 0) return "0B";
  let k = 1024;
  sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(1) + " " + sizes[i];
}

function formatTime(time) {
  let dateObj = new Date(time);
  return dateObj.toISOString().slice(0,10);
}