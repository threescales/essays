'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production'

exports.tslint = {
    test: /\.tsx?$/,
    loader: 'tslint-loader',
    exclude: /node_modules/,
};

exports.tsx = {
    test: /\.tsx?$/,
    use: {
        loader: 'awesome-typescript-loader',
    },
    exclude: /node_modules/,
};

exports.istanbulInstrumenter = {
    test: /^(.(?!\.test))*\.tsx?$/,
    use: {
        loader: 'istanbul-instrumenter-loader',
    },
    query: {
        embedSource: true,
    },
};

exports.html = {
    test: /\.html$/,
    use: {
        loader: 'raw-loader',
    },
    exclude: /node_modules/,
};

exports.css = {
    test: /\.css$/,
    use: isProduction ? ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
    }) : ['style-loader', 'css-loader', ],
    exclude: /node_modules/,
};

exports.less = {
    test: /\.less$/,
    use: isProduction ? ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
    }) : ['style-loader', 'css-loader', 'less-loader']
}

exports.pluginCss = {
    test: /plugin\.css$/,
    use: isProduction ? ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
    }) : ['style-loader', 'css-loader']
}

exports.json = {
    test: /\.json$/,
    use: {
        loader: 'json-loader',
    }
};

exports.svg = makeUrlLoader(/\.svg$/);
exports.eot = makeUrlLoader(/\.eot$/);
exports.woff = makeUrlLoader(/\.woff$/);
exports.woff2 = makeUrlLoader(/\.woff2$/);
exports.ttf = makeUrlLoader(/\.ttf$/);

function makeUrlLoader(pattern) {
    return {
        test: pattern,
        use: {
            loader: 'url-loader',
        },
        exclude: /node_modules/,
    };
}