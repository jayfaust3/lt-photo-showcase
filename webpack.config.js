const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

const {
  HOST_SERVER,
  HOST_PORT,
  LEAN_TECHNIQUES_PHOTO_SERVICE_BASE_URL,
  LEAN_TECHNIQUES_PHOTO_SERVICE_BASE_URL_PROXY,
  LEAN_TECHNIQUES_PHOTO_SERVICE_API_KEY_HEADER,
  LEAN_TECHNIQUES_PHOTO_SERVICE_API_KEY
} = process.env

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                }
            }
        ]
    },
    devServer: {
        host: HOST_SERVER,
        port: HOST_PORT,
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        client: {
            overlay: false,
            reconnect: 2
        },
        proxy: [
            {
                context: [LEAN_TECHNIQUES_PHOTO_SERVICE_BASE_URL_PROXY],
                target: LEAN_TECHNIQUES_PHOTO_SERVICE_BASE_URL,
                changeOrigin: true,
                secure: false
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env': {
                LEAN_TECHNIQUES_PHOTO_SERVICE_API_KEY_HEADER: JSON.stringify(LEAN_TECHNIQUES_PHOTO_SERVICE_API_KEY_HEADER),
                LEAN_TECHNIQUES_PHOTO_SERVICE_API_KEY: JSON.stringify(LEAN_TECHNIQUES_PHOTO_SERVICE_API_KEY),
                LEAN_TECHNIQUES_PHOTO_SERVICE_BASE_URL_PROXY: JSON.stringify(LEAN_TECHNIQUES_PHOTO_SERVICE_BASE_URL_PROXY)
            }
        })
    ]
};
