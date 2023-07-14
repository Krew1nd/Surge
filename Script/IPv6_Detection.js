/*
author：TG@小白脸

支持$argument
wifi,匹配所有ssid
flow,匹配数据流量
ssid,ssid名字

多个内容用,隔开
wifi,flow,ssid 表示强制打开IPv6
!wifi,!flow,!ssid 表示强制关闭IPv6

不填写则自动判断当前网络环境是否支持IPv6
*/

const moduleName = "IPv6"; //模块名

async function main() {
   const result = await httpAPI("v1/modules");
   const enabled = result.enabled.includes(moduleName);

   const modules = typeof $argument === "string" ? rule() : isConnectedToIPv6();

   if (enabled !== modules) {
      await httpAPI("/v1/modules", "POST", { [moduleName]: modules });
   }
}

main().finally(() => $done());

function httpAPI(path, method = "GET", body = null) {
   return new Promise((resolve) => {
      $httpAPI(method, path, body, (result) => {
         resolve(result);
      });
   });
}

const rule = () => {
   const custom = $argument;
   const _ssid = $network.wifi.ssid;

   const r = (...s) => {
      for (var k of s) {
         const num = custom.indexOf(k);
         if (num > -1) return custom[num - 1] === "!" ? "false" : true;
         return false;
      }
   };
   return _ssid === null ? r("flow") : r("wifi", _ssid);
};

const isConnectedToIPv6 = () => {
   const ip = $network.v6.primaryAddress;
   return !!ip && !ip.includes("fe80:");
};