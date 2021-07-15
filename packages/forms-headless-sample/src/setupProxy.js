const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/content",
    createProxyMiddleware({
      target: "http://localhost:4502",
      changeOrigin: true,
    })
  );
};
