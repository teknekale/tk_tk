var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config.js'),
    protractor = require("gulp-protractor").protractor,
    path = require('path'),
    child_process = require('child_process'),
    del = require('del'),

    webpackServerInstance = null;

// Build task for production
gulp.task('default', ['webpack:build']);
gulp.task('build', ['webpack:build']);

// Build task for dev
gulp.task('build-dev', ['webpack:build-dev']);

// Watch task for dev environment
gulp.task('watch-dev', ['webpack:build-dev'], function() {
    gulp.watch(['src/assets/**/*'], ['webpack:build-dev']);
});

// Run dev server
gulp.task('run', ['webpack:dev-server']);

gulp.task('copy-static', function() {
    gulp.src(['src/assets/images/**/*']).pipe(gulp.dest('site/images'));
    gulp.src(['src/assets/fonts/**/*']).pipe(gulp.dest('site/fonts'));
});

gulp.task('clean', function(done) {
    del(['build'], done);
});

// Webpack tasks
gulp.task('webpack:build', ['copy-static'], function(callback) {
    // Modify some webpack config options
    var config = Object.create(webpackConfig);

    config.plugins = config.plugins.concat(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            'minimize': true
        })
    );

    // Run webpack
    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack:build', err);
        gutil.log('[webpack:build]', stats.toString({
            'colors': true
        }));
        callback();
    });
});

gulp.task('webpack:build-dev', ['copy-static'], function(callback) {
    // Modify some webpack config options
    var config = Object.create(webpackConfig);

    config.debug = true;
    config.devtool = 'source-map';
    config.resolve.alias['config'] = 'config.js';

    // Run webpack
    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack:build-dev', err);
        gutil.log('[webpack:build-dev]', stats.toString({
            'colors': true
        }));
        callback();
    });
});

gulp.task('webpack:dev-server', ['copy-static'], function(callback) {
    // Modify some webpack config options
    var config = Object.create(webpackConfig);

    config.debug = true;
    config.devtool = 'source-map';
    config.resolve.alias['config'] = 'config.js';

    // Start a webpack-dev-server
    webpackServerInstance = new WebpackDevServer(webpack(config), {
            'publicPath': '/',
            'contentBase': config.output.path,
            'stats': {
                'colors': true
            }
        }
    );
    webpackServerInstance.listen(7000, "localhost", function(err) {
            if(err) throw new gutil.PluginError('webpack:dev-server', err);
            gutil.log('[webpack:dev-server]', 'http://localhost:7000/webpack-dev-server/index.html');
            callback();
        }
    );
});
