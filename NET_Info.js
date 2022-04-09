/*
[Panel]
Netinfo = script-name=Netinfo, update-interval=600

[Script]
Netinfo = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/unknowntokyo/surge-list/master/Surge/NET_Info.js,argument=group=策略组名称,script-update-interval=0
*/

;(async () => {

let params = getParams($argument)
//获取节点名
let group = params.group
let rootName = (await httpAPI("/v1/policy_groups/select?group_name="+encodeURIComponent(group)+"")).policy;

$httpClient.get('http://ip-api.com/json/?lang=en', function (error, response, data) {
    const jsonData = JSON.parse(data);
  switch (`${jsonData.org}`){
    case "":
      if (`${jsonData.isp}` != "") {
      $done({
      title:"节点信息："+rootName,
      content:
                `IP：${jsonData.query}\n` + `ISP：${jsonData.isp}\n` + `城市：${jsonData.city}`,
      icon: "info.circle",
       "icon-color":"#369CF3",
    });
      } else {
      $done({
      title:"节点信息："+rootName,
      content:
		`IP：${jsonData.query}\n` + `城市：${jsonData.city}`,
      icon: "info.circle",
       "icon-color":"#369CF3",
    });
      }
      break;
    default:
      if (`${jsonData.isp}` != "" && `${jsonData.isp}` != `${jsonData.org}`) {
      $done({
      title:"节点信息："+rootName,
      content:
		`IP：${jsonData.query}\n` + `ISP：${jsonData.isp}\n` + `数据中心：${jsonData.org}`,
      icon: "info.circle",
       "icon-color":"#369CF3",
    });
      } else {
      $done({
      title:"节点信息："+rootName,
      content:
		`IP：${jsonData.query}\n` + `ISP：${jsonData.isp}\n` + `城市：${jsonData.city}`,
      icon: "info.circle",
       "icon-color":"#369CF3",
     });
    }
   }
  });
})();

function httpAPI(path = "", method = "GET", body = null) {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
};

function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
