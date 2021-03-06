const {override, fixBabelImports, addLessLoader, addWebpackAlias, addWebpackPlugin} = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const path = require("path");
module.exports = override(
    fixBabelImports("import", {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#49B0FF'},// 主题颜色的更改
    }),
    addWebpackAlias({
        "@assets": path.resolve(__dirname, "./src/assets"),
    }),
    addWebpackPlugin(
        new AntdDayjsWebpackPlugin()
    ),
    (config, env) => {
        config = rewireReactHotLoader(config, env);
        return config;
    }
);