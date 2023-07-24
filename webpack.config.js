const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: 'public'}
            ]
        })
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 9002,
    },
    resolve: {
        extensions: ['.js']
    },
    mode: 'development'
};