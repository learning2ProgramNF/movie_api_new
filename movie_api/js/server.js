const http = require("http"),
  url = require("url"),
  fs = require("fs");

http
  .createServer((request, response) => {
    let addr = request.url,
      q = new URLSearchParams(addr, "http://" + request.headers.host),
      filepath = "";

    fs.appendFile(
      "log.txt",
      "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n",
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added to log.");
        }
      }
    );

    if (q.pathname.includes("documentation")) {
      filepath = __dirname + "/documentation.html";
    } else {
      filepath = "index.html";
    }

    fs.readFile(filepath, (err, data) => {
      if (err) {
        throw err;
      }

      response.writeHead(200, { Content: "text/plain" });
      response.write(data);
      response.end();
    });
  })
  .listen(8080);

console.log("Server running at port 8080");
