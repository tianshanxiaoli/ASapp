// 配置文件
const path = require('path');//引用path工具
const HtmlWebpackPlugin = require('html-webpack-plugin');//引用Html-webpack-plugin插件
const CleanWebpackPlugin = require('clean-webpack-plugin');//引用clean-webpack-plugin插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');//引用vue-loader插件

module.exports = {
    mode: 'development',//开发者模式
    entry: './src/main.js',//入口是main.js
    output: {//输出文件
        filename: 'bundle.js',//输出的文件名
        path: path.join(__dirname, './dist')//输出的文件路径
    },
    devServer: {//配置webpack-dev-server的基本配置
        contentBase: './src',//打开浏览器默认找的路径
        open: true,//自动打开浏览器
        hot: true,//启用热更新
        port: 8888//端口号
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },//.css文件使用css-loader加载
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },//.less文件使用less-loader加载
            { test: /\.(jpg|png|svg|webp|gif)$/, use: 'file-loader' },//图片文件使用file-loader
            { test: /\.(otf|eot|svg|ttf|woff|woff2)$/, use: 'file-loader' },//字体文件使用file-loader
            {
                test: /\.js$/,//.js文件结尾
                exclude: /node_modules/, //排除node_modules文件夹
                use: { 
                    loader: 'babel-loader',//使用babel-loader加载
                    options: {
                        presets: ['@babel/preset-env']//预置插件
                    }
                }
            },//配置babel转换ES6语法
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
    plugins: [//配置插件
        new HtmlWebpackPlugin({
            filename: 'index.html',//插件打包后输出的文件名
            template: './src/index.html'//打包后的输出路径
        }),
        new CleanWebpackPlugin({ verbose: true }),//打包前，把上一次删除的旧文件清除，并把信息打印到控制台
        new VueLoaderPlugin()//vue插件声明
    ]
}