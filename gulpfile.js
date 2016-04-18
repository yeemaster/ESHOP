//引入gulp
var gulp = require('gulp');


//引入组件
var concat = require('gulp-concat');           //合并
var jshint = require('gulp-jshint');           //js规范验证
var uglify = require('gulp-uglify');           //压缩
var rename = require('gulp-rename');          //文件名命名
var amdOptimize = require("amd-optimize");           //require优化
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var jade = require('gulp-jade');
// var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');

// Styles任务
gulp.task('yscss', function() {
    return gulp.src('./src/public/stylesheets/**/*.css')
    .pipe(autoprefixer())
    //压缩样式文件
    // .pipe(minifycss())
    //输出压缩文件到指定目录
    .pipe(gulp.dest('./dist/public/stylesheets/'));
    //提醒任务完成
    // .pipe(notify({ message: 'css task complete' }));
});


gulp.task('ysjade',function(){
    var YOUR_LOCALS = {};
    return gulp.src('./src/views/**/*.jade')
    // .pipe(jade({
    //      locals: YOUR_LOCALS
    //  }))
    .pipe(gulp.dest('./dist/views/'));
});



// 脚本检查
gulp.task('lint', function () {
    return gulp.src('./src/public/javascripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
        // .pipe(notify({ message: 'lint task complete' }));
});


//require合并
gulp.task('rjs', function () {
    return gulp.src('./src/public/javascripts/main.js')
        .pipe(amdOptimize("main", {
                paths: {                    //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
                    "zepto": "./src/public/libs/zepto.min",
                    "Carousel": "./src/public/javascripts/Carousel",
                    "Timing": "./src/public/javascripts/timing",
                    "verify": "./src/public/javascripts/verify",
                    "ajax": "./src/public/javascripts/ajax",
                    "jquery": "./src/public/libs/jquery-2.1.4.min",            
                    "indexmain": "./src/public/javascripts/index-main",
                    "registermain": "./src/public/javascripts/register-main",
                    "loginmain": "./src/public/javascripts/login-main"
                },
                shim: {                     //引入没有使用requirejs模块写法的类库。
                    zepto: {
                        exports: "$"
                    }
                }
        }))
        .pipe(concat("main.js"))           //合并
        .pipe(gulp.dest("./dist/public/javascripts/"))          //输出保存
        // .pipe(uglify())                        //压缩
        .pipe(gulp.dest("./dist/public/javascripts/"));         //输出保存
        // .pipe(notify({ message: 'rjs task complete' }));
});


gulp.task('routes',function(){
    return gulp.src('./src/routes/**/*.js')
    .pipe(gulp.dest('./dist/routes/'));
});

gulp.task('models',function(){
    return gulp.src('./src/models/**/*.js')
    .pipe(gulp.dest('./dist/models/'));
});

gulp.task('schemas',function(){
    return gulp.src('./src/schemas/**/*.js')
    .pipe(gulp.dest('./dist/schemas/'));
});


gulp.task('default', function () {
    //监听js变化
    gulp.watch('./src/public/javascripts/**/*.js', function () {       //当js文件变化后，自动检验 压缩
        gulp.run('lint', 'rjs');
    });

    //监听css变化
    gulp.watch('./src/public/stylesheets/**/*.css', function () {       //当css文件变化后，自动检验 压缩;
        gulp.run('yscss');
    });

    //监听jade变化   实际上服务器运行时根据请求才拼接成最后的jade 所以用不着这里
    gulp.watch('./src/views/**/*.jade', function () {       //当jade文件变化后，自动检验 压缩
        gulp.run('ysjade');
    });

    gulp.watch('./src/routes/**/*.js', function () {       //当routes文件变化后，自动检验 压缩
        gulp.run('routes');
    });

    gulp.watch('./src/models/**/*.js', function () {       //当models文件变化后，自动检验 压缩
        gulp.run('models');
    });

     gulp.watch('./src/schemas/**/*.js', function () {       //当schemas文件变化后，自动检验 压缩
        gulp.run('schemas');
    });           
});