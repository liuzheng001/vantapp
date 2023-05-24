const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      // port:8081,
      proxy: {
        "/api": {//捕获API的标志，如果API中有这个字符串，那么就开始匹配代理，
          // target: "http://r1w8478651.imwork.net:8080",//代理的api地址，就是要跨域的地址
          // target: "http://localhost:9998",//代理的api地址，就是要跨域的地址
          // target: "http://r1w8478651.imwork.net:9998",//代理的api地址，就是要跨域的地址
          "target": "http://localhost:8888",//代理的api地址，就是要跨域的地址
          // "target": "http://14.105.19.97:8080",//代理的api地址，就是要跨域的地址
          // "target": "http://192.168.1.154:8080",//代理的api地址，就是要跨域的地址
          // "target": "http://192.168.0.157:8080",//代理的api地址，就是要跨域的地址
          // "target": "http://192.168.0.102:8080",//代理的api地址，就是要跨域的地址
          // "target": "http://14.105.19.108:8080",//代理的api地址，就是要跨域的地址
          "changeOrigin": true,// 这个参数可以让target参数是域名
          "ws": false,//是否启用websockets，用不到可设为false
          "pathRewrite": {//对路径匹配到的字符串重写
            "^/api": "",
          },
        },
      },
    },
  },
})
