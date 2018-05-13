"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var cssminify = require("gulp-csso");
var imgminify = require("gulp-imagemin");
var del = require("del");
var run = require("run-sequence");

gulp.task("clean", function() {
  return del([
    "build/**/*"
  ]);
});

gulp.task("copy", function() {
  return gulp.src([
    "source/*.html",
    "source/fonts/**/*.{woff,woff2}",
    "source/js/**/*.js"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(cssminify())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imgminify([
      imgminify.optipng({optimizationLevel: 3}),
      imgminify.jpegtran({progressive: true}),
      imgminify.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("build", function(done) {
  run("clean", "copy", "style", "images", done);
});

gulp.task("serve", ["build"], function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["copy"]);
  gulp.watch("build/*.html").on("change", server.reload);
});
