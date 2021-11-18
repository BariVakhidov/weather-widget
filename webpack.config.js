const path = require('path')
const { NODE_ENV, PRODUCTION } = require('./webpack/utils/constants')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
    getHtmlWebpackPlugin,
} = require('./webpack/plugins/html-webpack-plugin')
const { getCssLoader } = require('./webpack/loaders/css-loader')
const {
    getMiniCssExtractPlugin,
} = require('./webpack/plugins/mini-exstract-css')

module.exports = {
    mode: NODE_ENV || PRODUCTION,
    entry: './src/index.tsx',
    devServer: {
        historyApiFallback: true,
        hot: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', getCssLoader(), 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@Components': path.resolve(__dirname, 'src/components/'),
            '@Utilities': path.resolve(__dirname, 'src/utilities/'),
            '@API': path.resolve(__dirname, 'src/api/'),
            '@Assets': path.resolve(__dirname, './assets/'),
            '@': path.resolve(__dirname, 'src/'),
        },
    },
    plugins: [getHtmlWebpackPlugin(), getMiniCssExtractPlugin()],
}
