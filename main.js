const http = require("http");
const fs = require("fs");
const url = require("url");
// calling replace template function
const replaceTemplate = require(`${__dirname}/modules/replaceTemp.js`);

const overviewTemp = fs.readFileSync(
  `${__dirname}/templates/overviewTemp.html`,
  "utf-8"
);

const cardTemp = fs.readFileSync(
  `${__dirname}/templates/cardTemplate.html`,
  "utf-8"
);
const productTemp = fs.readFileSync(
  `${__dirname}/templates/productTemp.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // for overview

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    const cardMap = dataObject
      .map((dataItem) => replaceTemplate(cardTemp, dataItem))
      .join("");
    let output = overviewTemp.replace(/{%cards%}/, cardMap);
    res.end(output);
  }
  // for product
  else if (pathname === "/product") {
    res.writeHead(200, { "content-type": "text/html" });
    const product = dataObject[query.id];
    let output = replaceTemplate(productTemp, product);
    res.end(output);
  }
  // for api
  else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  }
  // page not found
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(7000, () => {
  console.log("Listening to the server");
});
