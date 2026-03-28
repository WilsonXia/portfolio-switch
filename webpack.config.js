const path = require('path');

module.exports = {
    entry: {
        creator: './client/pages/projectCreator.jsx',
        home: './client/pages/home.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                exclude: /hosted/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ]
            }
        ],
    },
    mode: 'production',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
};