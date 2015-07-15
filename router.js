var routes = require("routes")(),
  cbRoutes = require("./routes/genetic");

routes.addRoute("/", cbRoutes.landing);
routes.addRoute("/site", cbRoutes.index);
routes.addRoute("/data.json", cbRoutes.data);
routes.addRoute("/public/*", cbRoutes.publicRoute);

module.exports = routes;
