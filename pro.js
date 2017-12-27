const { resolve } = require('path');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const fs = require('fs-extra')
const path = require('path')


console.log('打包pro');

fs.removeSync('dist/src') 
fs.mkdir('dist/src', ()=>{})
fs.mkdir('dist/src/source', ()=>{})

const BUILD_DIR = path.resolve(__dirname, 'src');
const APP_DIR = path.resolve(__dirname, 'public');

module.exports = {
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            },
            // {
            //     test: /\.scss$/, //-- 可以直接用scss... 但不知道跟 css 另外打包的 plugin 會不會衝到，要再研究，先不用
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'postcss-loader',
            //         'sass-loader'
            //     ],
            // },
            {      
                test: /^((?!\.global).)*\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.scss$/, //-- 可以直接用scss... 但不知道跟 css 另外打包的 plugin 會不會衝到，要再研究，先不用
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.global\.css$/,  // anything with .global will not go through css modules loader
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.(png|gif|jpg|svg|eot|woff(2)?|ttf)?$/,
                use: 'url-loader?name=source/[name]-[hash].[ext]',
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css",
            chunkFilename: "[id].css"
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new webpack.NamedModulesPlugin()
    ]
}






