const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
const serveIndex = require('serve-index');
const connectHistoryApiFallback = require('connect-history-api-fallback');

// 接口代理
const devHost = '172.16.21.210';
const devProt = '80';
const devPrefix = '/dapi';


// 由js控制路由，一定要写在express.static前面！！！
app.use('/', connectHistoryApiFallback());
//此处设置静态文件的路径
const basePath = path.resolve('./assets/joycloud/');
app.use(express.static(basePath));

// proxy
//具体配置查看 https://github.com/chimurai/http-proxy-middleware
app.use(`${devPrefix}`, proxy({target: `http://${devHost}:${devProt}`, changeOrigin: true}));

//需要配置在 proxy配置后面
app.use('/', serveIndex(basePath, {'icons': true}));

app.listen(3000, function () {
  console.log('app listening on port 3000!');
})