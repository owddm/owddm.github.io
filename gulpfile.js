var gulp = require("gulp");
var imagemin = require("gulp-imagemin");

// Task to minify images
gulp.task("default", function() {
  gulp
    .src("docs/assets/images/**/*.+(png|jpg|jpeg|gif)")
    .pipe(
      imagemin({
        progressive: true
      })
    )
    .pipe(gulp.dest("docs/assets/images"));
});
