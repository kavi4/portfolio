var gulp = require("gulp");
concatCSS = require("gulp-concat-css");
miniCSS = require("gulp-clean-css");
rename = require("gulp-rename");
notify = require("gulp-notify");
prefix = require("gulp-autoprefixer");
sass = require("gulp-sass");
minijs = require("gulp-uglify");
clean = require("gulp-clean");
concat = require("gulp-concat");
rigger = require("gulp-rigger");

var path =
    {
        build:
            {
                html: 'build/',
                css: 'build/css/',
                js: 'build/js/',
                img: 'build/img/',
                fonts: 'build/fonts/',
                libs: 'build/libs',
                clean: 'build/*'
            },
        src:
            {
                html: 'src/index.html',
                css: '',
                js: '',
                img: 'src/img/**/*',
                fonts: '',
                libs: 'src/libs/*.js',
                app: 'src/components/app.js',
            },
        watch:
            {
                components: 'src/components/*.js',
                html: 'src/index.html',
                libs: 'src/libs/*.js',

            }
    }

gulp.task('styles', function () {
    return gulp.src(path.src.css)
        .pipe(prefix())
        .pipe(miniCSS())
        .pipe(gulp.dest(path.build.css))
});

gulp.task('html', function () {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
});

gulp.task('components', function () {
    return gulp.src(path.src.app)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
})
gulp.task('img', function () {
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
})
gulp.task('libs', function () {
    return gulp.src(path.src.libs)
        .pipe(gulp.dest(path.build.libs))
})

gulp.task('watch', function () {
    gulp.watch(path.watch.components, gulp.parallel('components'))
    gulp.watch(path.watch.html, gulp.parallel('html'))
    gulp.watch(path.watch.libs, gulp.parallel('libs'))
})

gulp.task('clean', function () {
    return gulp.src(path.build.clean, {read: false})
        .pipe(clean())
})

gulp.task('build', gulp.parallel('libs', 'img', 'html', 'components'));

gulp.task("default", function () {

});


