var gulp = require("gulp"),
  autoprefixer = require("gulp-autoprefixer");
  del = require("del"),
  livereload = require("gulp-livereload"),
  nodemon = require("gulp-nodemon"),
  open = require("gulp-open"),
  sass = require("gulp-sass"),
  webpack = require("webpack-stream");

gulp.task("html", function () {
  return gulp.src(["src/**/*.html"])
    .pipe(gulp.dest("wwwroot"))
    .pipe(livereload());
});

gulp.task("content", function () {
  return gulp.src(["src/content/**/*"])
    .pipe(gulp.dest("wwwroot/content"))
    .pipe(livereload());
});

gulp.task("fonts", function () {
  return gulp.src(["src/fonts/**/*"])
    .pipe(gulp.dest("wwwroot/fonts"))
    .pipe(livereload());
});

gulp.task("static-assets", ["html", "fonts"], function() {
  return gulp.src("src/favicon.ico")
    .pipe(gulp.dest("wwwroot"));
});

var webpackConfig = require("./webpack.config.js");
gulp.task("webpack", function () {
  return webpack(webpackConfig)
    .pipe(gulp.dest("wwwroot/scripts"))
    .pipe(livereload());
});

gulp.task("sass", function () {
  return gulp.src(["src/styles/**/*.scss"])
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ["last 2 versions"],
      cascade: false
    }))
    .pipe(gulp.dest("wwwroot/styles"))
    .pipe(livereload());
});

gulp.task("watch", function () {
  gulp.watch(["src/**/*.html", "content/**/*"], ["static-assets"]);
  gulp.watch(["src/scripts/**/*.ts", "src/scripts/**/*.tsx"], ["webpack"]);
  gulp.watch(["src/styles/**/*.scss"], ["sass"]);
});

gulp.task("clean", function () {
  return del(["wwwroot"]);
});

gulp.task("build", ["static-assets", "webpack", "sass"]);

gulp.task("develop", ["build", "watch"], function () {
  livereload.listen();
  return nodemon({ script: "server.js" });
});

gulp.task("default", ["develop"], function () {
  gulp.src("").pipe(open({ uri: "http://localhost:3000" }));
});
