var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");

//Complie Sass & Inject into browser
gulp.task("sass", function() {
  return gulp.src(["node_modules/bootstrap/scss/bootstrap.scss", "public/scss/*.scss"])
  .pipe(sass())
  .pipe(gulp.dest("public/css"))
  .pipe(browserSync.stream());
});

//Move JS files to Public folder
gulp.task("js", function() {
  return gulp.src(["node_modules/bootstrap/dist/js/bootstrap.min.js", "node_modules/jquery/dist/jquery.min.js", "node_modules/popper.js/dist/umd/popper.min.js"])
  .pipe(gulp.dest("public/js"))
  .pipe(browserSync.stream());
});

//Watch Sass & Serve
gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./public"
  });
  
  gulp.watch(["node_modules/bootstrap/scss/bootstrap.scss", "public/scss/*.scss"], ["sass"]);
});

//Move fontawesome fonts folder to public
gulp.task("fonts", function() {
  return gulp.src("node_modules/font-awesome/fonts/*")
  .pipe(gulp.dest("public/fonts"));
});

//Move fontawesome css to public
gulp.task("fa", function() {
  return gulp.src("node_modules/font-awesome/css/font-awesome.min.css")
  .pipe(gulp.dest("public/css"));
});

gulp.task("default", ["sass", "js", "serve", "fa", "fonts"]);