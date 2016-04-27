var path = require('path'),
    webpack = require('webpack'),
    extractTextPlugin = require("extract-text-webpack-plugin"),
    htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function() {
    var config = {
        'entry': {
            'app': 'app.module',

            'styles': [
                'styles.less'
            ],

            'vendor': [
                'angular',
                'angular-route',
                'angular-resource',
                'angular-sanitize',
                'angular-translate',
                'path'
            ]
        },

        'output': {
            'path': path.join(__dirname, 'site'),
            'publicPath': 'site',
            'filename': '[name][hash].js'
        },

        'module': {
            'loaders': [
                {'test': /\.css$/,  'loader' : extractTextPlugin.extract('style', 'css')},
                {'test': /\.less$/, 'loader' : extractTextPlugin.extract('style', 'css!less')},
                {'test': /\.png$/,  'loader' : 'url', 'query': {'limit': 8192, 'mimetype': 'image/png'}},
                {'test': /\.jpg$/,  'loader' : 'file'},
                {'test': /\.gif$/,  'loader' : 'file'},
                {'test': /\.eot$/,  'loader' : 'file'},
                {'test': /\.woff$/, 'loader' : 'file'},
                {'test': /\.woff2$/,'loader' : 'file'},
                {'test': /\.ttf$/,  'loader' : 'file'},
                {'test': /\.svg$/,  'loader' : 'file'},
                {'test': /\.html$/, 'loaders': ['ngtemplate?relativeTo=/javascript/', 'raw']}
            ]
        },

        'resolve': {
            'root': [
                path.join(__dirname, 'src/assets/javascript'),
                path.join(__dirname, 'src/assets/less'),
                path.join(__dirname, 'src/assets/images'),
                path.join(__dirname, 'src/assets/fonts'),
                path.join(__dirname, 'src/assets/static'),
                path.join(__dirname, 'src/assets/libs'),
                path.join(__dirname, 'node_modules')
            ],
            'alias': {}
        },

        'resolveLoader': {
            'root': [
                path.join(__dirname, 'node_modules')
            ]
        },

        'plugins': [
            new webpack.optimize.CommonsChunkPlugin('vendor', '[name][hash].js'),
            new extractTextPlugin('[name][hash].css'),
            new htmlWebpackPlugin({
                'filename': 'teknekale.html',
                'template': 'src/assets/static/index.html',
                'inject': 'body'
            })
        ]
    };
    return config;
}();
