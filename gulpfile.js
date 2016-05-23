var gulp = require("gulp")
  , autoprefixer = require("gulp-autoprefixer")
  , Bust = require("gulp-bust")
  , del = require("del")
  , livereload = require("gulp-livereload")
  , nodemon = require("gulp-nodemon")
  , open = require("gulp-open")
  , plumber = require("gulp-plumber")
  , sass = require("gulp-sass")
  , webpack = require("webpack-stream");

var bust = new Bust();

gulp.task("html", function () {
  return gulp.src(["src/**/*.html"])
    .pipe(gulp.dest("public"))
    .pipe(livereload());
});

gulp.task("fonts", function () {
  return gulp.src([
    "src/fonts/**/*",
    "node_modules/font-awesome/fonts/**/*"
  ]).pipe(gulp.dest("public/fonts"))
    .pipe(livereload());
});

gulp.task("static-assets", ["html", "fonts"], function () {
  return gulp.src("src/favicon.ico")
    .pipe(gulp.dest("public"));
});

var webpackConfig = require("./webpack.config.js");
gulp.task("webpack", function () {
  return gulp.src("src/scripts/main.tsx")
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .pipe(bust.resources())
    .pipe(gulp.dest("public/scripts"))
    .pipe(livereload());
});

gulp.task("sass", function () {
  return gulp.src(["src/styles/**/*.scss"])
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ["last 2 versions"],
      cascade: false
    }))
    .pipe(bust.resources())
    .pipe(gulp.dest("public/styles"))
    .pipe(livereload());
});

gulp.task("watch", function () {
  gulp.watch(["src/**/*.html"], ["html"]);
  gulp.watch(["src/scripts/**/*.ts", "src/scripts/**/*.tsx"], ["webpack"]);
  gulp.watch(["src/styles/**/*.scss"], ["sass"]);
});

gulp.task("clean", function () {
  return del(["public"]);
});

gulp.task("build", ["static-assets", "webpack", "sass"], function () {
  return gulp.src("public/**/*.html")
    .pipe(bust.references())
    .pipe(gulp.dest("public"));
});

gulp.task("develop", ["build", "watch"], function () {
  livereload.listen();
  return nodemon({ script: "server.js" });
});

gulp.task("default", ["develop"], function () {
  gulp.src("").pipe(open({ uri: "http://localhost:3000" }));
});
