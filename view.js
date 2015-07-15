var mustache = require("mustache"),
  fs = require("fs");

var view = {
  render: (path, data) => {
    var file = fs.readFileSync("views/" + path + ".html");
    return mustache.render(file.toString(), data);
  }
};

module.exports = view;
