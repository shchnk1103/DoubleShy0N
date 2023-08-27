// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = (req, res) => {
//   let target = "";

//   if (req.url.startsWith("/api")) {
//     target = "http://47.98.244.246:8000/";
//   }

//   createProxyMiddleware({
//     target,
//     changeOrigin: true,
//     pathRewrite: {
//       "^/api": "/",
//     },
//   })(req, res);
// };
