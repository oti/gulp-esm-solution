import gulp from "gulp";
import imagemin, { mozjpeg } from "gulp-imagemin";

export const image = () =>
  gulp
    .src("./src/image/**/*")
    .pipe(imagemin([mozjpeg({ quality: 50 })]))
    .pipe(gulp.dest("./dist/image/"));
