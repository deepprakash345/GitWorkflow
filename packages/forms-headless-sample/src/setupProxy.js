const { createProxyMiddleware } = require("http-proxy-middleware");
const http = require('http');

module.exports = function (app) {
    const proxy = createProxyMiddleware({
        target: "http://localhost:4502",
        changeOrigin: true,
        onError : (err, req, res, target) => {
            res.writeHead(500, {
                'Content-Type': 'text/plain',
            });
            console.log("error occurred");
            res.end('Something went wrong. And we are reporting a custom error message.');
        },
        onProxyRes : (proxyRes, req, res) => {
            console.log("onProxRes occurred")
            var body = [];
            proxyRes.on('data', function (chunk) {
                body.push(chunk);
            });
            proxyRes.on('end', function () {
                body = Buffer.concat(body).toString();
                console.log("response received from proxied server");
                // res.end("my response to cli");
            });
        },
        onProxyReq : (proxyReq, req, res) => {
            proxyReq.setHeader("user-agent", "forms-headless-demo")
            console.log(`new request ${proxyReq.method} ${proxyReq.path}`)
        }
    })
  app.use(
    "/content",
    proxy
  );
};
