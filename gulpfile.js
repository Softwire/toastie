var gulp = require("gulp"),
  del = require("del"),
  open = require("gulp-open"),
  sass = require("gulp-sass"),
  webpack = require("webpack-stream");

gulp.task("html", function () {
  return gulp.src(["src/**/*.html"])
    .pipe(gulp.dest("wwwroot"));
});

gulp.task("content", function () {
  return gulp.src(["src/content/**/*"])
    .pipe(gulp.dest("wwwroot/content"));
});

gulp.task("static-assets", ["html", "content"]);

var webpackConfig = require("./webpack.config.js");
gulp.task("webpack", function () {
  return webpack(webpackConfig)
    .pipe(gulp.dest("wwwroot/scripts"));
});

gulp.task("sass", function () {
  return gulp.src(["src/styles/**/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("wwwroot/styles"));
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

gulp.task("default", ["build", "watch"], function () {
  gulp.src("wwwroot/index.html").pipe(open());
});
