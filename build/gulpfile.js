'use strict';

var gulp = require('gulp');
// var gulpLoadPlugins = require('gulp-load-plugins');
var assign = require('object-assign');
// var rename = require('gulp-rename');
var glob = require('glob');
var path = require('path');
var webpack = require('webpack');
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

// var webpackConfig = require('./webpack.config.js');
var webpackDevConfig = require("./webpack.dev.config.js")
var webpackBasicExampleConfig = require("./webpack.basic.example.config.js")
var webpackTestUnitConfig = require("./webpack.test.unit.config.js")
// var plugins = gulpLoadPlugins();
var gulpNova = require('gulp-nova');
var gulpRename = require('gulp-rename');
var browserSync = require('browser-sync');
// let chokidar = require('chokidar');
// let Funnel = require("./libs/Funnel.js");
// let funnel = new Funnel(0);

/************************** some utils function *****************************/
var webpackHandler = function(error, stats) {
    if(error) {
        console.log('\x1b[31m%s\x1b[0m',"webpack error!!!")
        console.log(error);
    } else {
        if(stats.compilation.warnings.length > 0){
            console.log('\x1b[33m%s\x1b[0m',"warning~~~~~~~~~~~")
            console.log(stats.compilation.warnings)
        } else {
            console.log('\x1b[36m%s\x1b[0m',"no warning")
        }
        if(stats.compilation.errors.length > 0){
            console.log('\x1b[31m%s\x1b[0m',"error!!!!!!!!!!!!!")
            console.log(stats.compilation.errors)
        } else {
            console.log('\x1b[36m%s\x1b[0m',"no error")
        }
        console.log('\x1b[35m%s\x1b[0m','['+new Date().toLocaleString()+']','--webpack handle done');
        browserSync.reload();
    }
}

// var watcher = chokidar.watch('../example/basic/component/*/main.html', {
//   ignored: /[\/\\]\./,
//   persistent: true
// });

/************************** Build each page *****************************/
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: '../',
      index:"./example/basic/index.html"
    },
  })
})

gulp.task('build-router',function(){
    webpack(assign({},webpackDevConfig,{
        watch:true,
        output: {
            path: '../dist',
            filename: 'nova-router.js',
            library: 'NovaRouter',
            libraryTarget: 'umd'
        },
    }),webpackHandler);
})

gulp.task('build-router-dev',function(){
    webpack(assign({},webpackDevConfig,{
        output: {
            path: '../dist',
            filename: 'nova-router.dev.js',
            library: 'NovaRouter',
            libraryTarget: 'umd'
        },
        watch:true,
        devtool: '#source-map'
    }),webpackHandler);
})

gulp.task('build-router-min',function(){
    webpack(assign({},webpackDevConfig,{
        output: {
            path: '../dist',
            filename: 'nova-router.min.js',
            library: 'NovaRouter',
            libraryTarget: 'umd'
        },
        watch:true,
        plugins: [
            new UglifyJsPlugin({
                compress: {}
            })
        ],
    }),webpackHandler);
})

gulp.task("build-basic-example",function(){
    webpack(assign({},webpackBasicExampleConfig,{
        watch:true
    }),webpackHandler);
})

gulp.task('build-component',function(){
    gulp.src('../example/basic/component/*/main.html')
    .pipe(gulpNova({
        combo: {
            baseUrl: '.'
        }
    }))
    .pipe(gulpRename(function(path) {
        path.extname = '.js';
    }))
    .pipe(browserSync.stream());
})

gulp.task('build-router-view',function(){
    gulp.src('../src/component/*/main.html')
    .pipe(gulpNova({
        combo: {
            baseUrl: '.'
        }
    }))
    .pipe(gulpRename(function(path) {
        path.extname = '.js';
    }))
    .pipe(browserSync.stream());
})

gulp.task('build-unit-test',function(){
    webpack(assign({},webpackTestUnitConfig,{
        watch:true
    }),webpackHandler);
})

gulp.task('run-unit-test',function(){
    browserSync({
    server: {
      baseDir: '../',
      index:"./test/unit/index.html"
    },
  })
})

gulp.task('unit-test',['build-unit-test','run-unit-test'])

gulp.task('watch', function(){
  gulp.watch('../example/basic/component/*/main.html', ['build-component']);
  gulp.watch('../src/component/*/main.html', ['build-router-view']);
  gulp.watch('../example/basic/index.html',browserSync.reload)
  gulp.watch('../example/basic/example.js',browserSync.reload)
})

// // 仅监听增加
// watcher.on("all",(event, path) => {
// })

gulp.task('build',['build-router-view','build-router','build-router-min','build-router-dev'])

gulp.task('default', ['browserSync','build-router','build-router-view','build-component',"build-basic-example",'watch']);

// gulp.task('build', function() {
//     var viewBase = './www/static_dev/view/';
//     var jsBase = './www/static/js/page/';

//     glob(viewBase + '*/*.js', function(err, files) {
//         var entryObj = {};
//         files.forEach(function(fileName) {
//             var name = path.relative(viewBase, fileName).replace(/\.js/, '');
//             entryObj[name] = fileName
//         });

//         console.log("compile list")
//         console.log(entryObj)

//         // console.log(webpackConfig)

//         webpack(assign({}, webpackConfig, {
//             entry: entryObj,
//             output: {
//                 filename: '[name].js',
//                 path: jsBase,
//                 publicPath: ''
//             },
//             plugins: [
//                 new CommonsChunkPlugin('../global.js'),
//                 new ExtractTextPlugin("../css/[name].css")
//             ],
//             watch: true
//         }), function(error, stats) {
//             if(error) {
//                 console.log('\x1b[31m%s\x1b[0m',"webpack error!!!")
//                 console.log(error);
//             } else {
//                 if(stats.compilation.warnings.length > 0){
//                     console.log('\x1b[33m%s\x1b[0m',"warning~~~~~~~~~~~")
//                     console.log(stats.compilation.warnings)
//                 } else {
//                     console.log('\x1b[36m%s\x1b[0m',"no warning")
//                 }
//                 if(stats.compilation.errors.length > 0){
//                     console.log('\x1b[31m%s\x1b[0m',"error!!!!!!!!!!!!!")
//                     console.log(stats.compilation.errors)
//                 } else {
//                     console.log('\x1b[36m%s\x1b[0m',"no error")
//                 }
//                 console.log('\x1b[35m%s\x1b[0m','['+new Date().toLocaleString()+']','--webpack handle done');
//             }
//         });

//     });
// });