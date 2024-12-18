const path = require("path");
const CracoLessPlugin = require("craco-less");

const pxtorem = require("postcss-pxtorem");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 配置src别名
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style: {
    postcss: {
      mode: "extends",
      loaderOptions: {
        postcssOptions: {
          ident: "postcss",
          plugins: [
            [
              pxtorem({
                rootValue: 37.5, //根据ui提供的效果图修改  看是1x还是2x
                propList: ["*"],
                minPixelValue: 3,
                exclude: /node_modules/i,
              }),
            ],
          ],
        },
      },
    },
  },
  devServer: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://usdtx.free.idcfengye.com/usdtx-api",
        changeOrigin: true,
      },
    },
  },
};
