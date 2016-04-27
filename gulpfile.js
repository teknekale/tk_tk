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

gulp.task('default', ['webpack:build']);
gulp.task('build', ['webpack:build']);
gulp.task('run', ['watch-dev']);
gulp.task('clean', function(done) { del(['site'], done); });

gulp.task('watch-dev', ['webpack:build'], function() {
    gulp.watch(['src/assets/**/*'], ['webpack:build']);
});

gulp.task('copy-static', function() {
    gulp.src(['src/assets/images/**/*']).pipe(gulp.dest('site/images'));
    gulp.src(['src/assets/fonts/**/*']).pipe(gulp.dest('site/fonts'));
});

gulp.task('webpack:build', ['copy-static'], function(callback) {
    var config = Object.create(webpackConfig);

    config.debug = true;
    config.devtool = 'source-map';
    config.resolve.alias['config'] = 'config.js';

    config.plugins = config.plugins.concat(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            'minimize': true
        })
    );

    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack:build', err);
        gutil.log('[webpack:build]', stats.toString({
            'colors': true
        }));
        callback();
    });
});
