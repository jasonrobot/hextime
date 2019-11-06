const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    // 'style-loader',
                    // { loader: 'style-loader', options: { injectType: 'styleTag' } },
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Get the direct string result of a CSS require, usefil for
                    // webcomponents, since we'll just need to cram that into a
                    // <style>
                    // 'to-string-loader',
                    // Compiles Sass to CSS
                    // 'sass-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'css-loader',
                    'sass-loader',
                ],
            },
            // {
            //     test: /\.html$/,
            //     use: [{
            //         loader: 'html-loader',
            //         options: {
            //             minimize: true,
            //         },
            //     }],
            // },
            {
                test: /\.mhtml$/,
                // loader: 'mustache-loader',
                loader: 'mustache-loader?minify',
            },
        ],
    },
    devtool: 'source-map',
};
