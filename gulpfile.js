"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var cssminify = require("gulp-csso");
var imgminify = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var cheerio = require('gulp-cheerio');
var rename = require("gulp-rename");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var run = require("run-sequence");

gulp.task("clean", function() {
  return del([
    "build/**/*"
  ]);
});

gulp.task("copy", function() {
  return gulp.src([
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

gulp.task("sprite", function() {
  return gulp.src("source/img/logo-pink-*.svg")
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
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

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build/"));
});

gulp.task("build", function(done) {
  run("clean", "copy", "style", "sprite", "images", "html", done);
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
  gulp.watch("source/*.html", ["html"]);
  gulp.watch("source/js/*.js", ["copy"]).on("change", server.reload);
  gulp.watch("source/img/*.svg", ["sprite"]).on("change", server.reload);
  gulp.watch("build/*.html").on("change", server.reload);
});
