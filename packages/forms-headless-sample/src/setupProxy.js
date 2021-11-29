const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    const proxy1 = createProxyMiddleware({
        target : "http://localhost:3001",
        changeOrigin : true,
        onError : (err, req, res, target) => {
            res.writeHead(500, {
                'Content-Type' : 'text/plain',
            });
            console.log("error occurred");
            res.end('Something went wrong. And we are reporting a custom error message.');
        },
        onProxyReq : (proxyReq, req, res) => {
            proxyReq.setHeader("user-agent", "forms-headless-demo")
            console.log(`new request ${proxyReq.method} ${proxyReq.path}`)
        }
    });
    const proxy2 = createProxyMiddleware({
        target : "http://localhost:4502",
        changeOrigin : true,
        onError : (err, req, res, target) => {
            res.writeHead(500, {
                'Content-Type' : 'text/plain',
            });
            console.log("error occurred");
            res.end('Something went wrong. And we are reporting a custom error message.');
        },
        onProxyReq : (proxyReq, req, res) => {
            proxyReq.setHeader("user-agent", "forms-headless-demo")
            console.log(`new request ${proxyReq.method} ${proxyReq.path}`)
        }
    })
    app.use(
        "/content",
        proxy2
    );
    app.use(
        "/pages/livecycle/af2-docs",
        proxy1
    );
};
