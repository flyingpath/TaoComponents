const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
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
            {
                test: /\.scss$/, 
                loader: ExtractTextPlugin.extract({        
                    fallback: 'style-loader',
                    use: 'css-loader!postcss-loader!sass-loader', 
                })
            },
            {
                test: /\.css$/,
                loaders: ExtractTextPlugin.extract({        
                    fallback: 'style-loader',
                    use: 'css-loader!postcss-loader', 
                })
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
		new ExtractTextPlugin("styles.css"),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),
		new webpack.NamedModulesPlugin()
	]
}






