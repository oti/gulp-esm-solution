# gulp-imagemin を v7.1.0 にダウングレードする

gulp-iamgemin v7.1.0 なら、gulpfile.esm.js でもエラーになりません。

```zsh
npm ci
npx gulp
[16:01:22] Requiring external module esm
[16:01:22] Using gulpfile ~/hoge/gulp-imagemin-with-esm/use-gulp-imagemin-v7/gulpfile.esm.js
[16:01:22] Starting 'default'...
[16:01:22] Starting 'image'...
[16:01:23] gulp-imagemin: Minified 1 image (saved 5.54 MB - 92.2%)
[16:01:23] Finished 'image' after 877 ms
[16:01:23] Finished 'default' after 878 ms
```

Success!

[↩︎ 戻る](/oti/gulp-imagemin-with-esm)
