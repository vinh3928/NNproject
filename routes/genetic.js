var router = require("routes")(),
  fs = require("fs"),
  db = require("monk")("localhost/genetic"),
  population = db.get("population"),
  qs = require("qs"),
  view = require("./../view"),
  mime = require("mime");

module.exports = {

  landing: (req, res, url) => {
    if (req.method === "GET") {
      var template = view.render("resources/landing", {})
      res.end(template);
    }
  },

  index: (req, res, url) => {
    if (req.method === "GET") {
      var template = view.render("resources/index", {});
      res.end(template);
    }
  },

  data: (req, res, url) => {
    if (req.method === "POST") {
      var data = "";

      req.on("data", function (chunk) {
        console.log(chunk.toString());
        data += chunk;
      });

      req.on("end", function () {
        var formatData = qs.parse(data);
        console.log(JSON.parse(data.toString()));
        res.end();
      });
    }
  },

  publicRoute: (req, res, url) => {
    res.setHeader("Content-Type", mime.lookup(req.url));
    if (req.method === "GET") {
      fs.readFile("." + req.url, function (err, file) {
        if (err) {
          res.setHeader("Content-Type", "text/html");
          res.end("404 not found");
        } else {
          res.end(file);
        }
      });
    }
  }

};
