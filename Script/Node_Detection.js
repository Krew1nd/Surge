const request = {
  url: "http://ip-api.com/json?lang=zh-CN",
  method: "GET",
};

const title = "Info from ip-api.com";
const icon = "network";

$httpClient.get(request, (error, response, body) => {
  if (error) {
    console.log(error);
    $done();
    return;
  }
  
  const { country, countryCode, isp, query, as } = JSON.parse(body);
  
  const aso = as.replace(/AS\d+ /g,"");
  
  const flagEmoji = getFlagEmoji(countryCode.toUpperCase() === "TW" ? "CN" : countryCode);

  let content = `远端 IP 地址：${query}\n远端 IP 区域：${flagEmoji} ${country}\n远端 IP ASO：${aso}`;

  const result = {
    title,
    content,
    icon,
  };
  
  $done(result);
});

const getFlagEmoji = (countryCode) => 
  String.fromCodePoint(...countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()));