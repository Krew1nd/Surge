const request = {
  url: "http://ip-api.com/json",
  method: "GET",
};

const title = "Info from ip-api.com";
const icon = "globe.asia.australia.fill";

$httpClient.get(request, (error, response, body) => {
  if (error) {
    console.log(error);
    $done();
    return;
  }
  
  const { country, countryCode, city, isp, query } = JSON.parse(body);
  
  const flagEmoji = getFlagEmoji(countryCode.toUpperCase() === "TW" ? "CN" : countryCode);

  let content = `${flagEmoji} ${country}`;
  if (city && city !== country) {
    content += ` ${city}`;
  }
  content +=`\n${isp}`;

  const result = {
    title,
    content,
    icon,
  };
  
  $done(result);
});

const getFlagEmoji = (countryCode) => 
  String.fromCodePoint(...countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()));