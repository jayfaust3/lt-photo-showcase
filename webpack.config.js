const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

const {
  HOST_SERVER,
  HOST_PORT
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
        // https: true,
        client: {
            overlay: false,
            reconnect: 2
        },
        // proxy: {}
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
    ]
};
