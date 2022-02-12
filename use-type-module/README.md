# package.json に `"type": "module"` を追加する

package.json に `"type": "module"` を追加すると、esm モジュール不要で gulp-iamgemin v8.0.0 でもエラーが起きません。`gulpfile.esm.js` へのリネームも不要です。

```zsh
npm ci
npx gulp
[16:04:11] Using gulpfile ~/hoge/gulp-imagemin-with-esm/use-type-module/gulpfile.js
[16:04:11] Starting 'default'...
[16:04:11] Starting 'image'...
[16:04:12] gulp-imagemin: Minified 1 image (saved 5.54 MB - 92.2%)
[16:04:12] Finished 'image' after 859 ms
[16:04:12] Finished 'default' after 860 ms
```

Success!

[↩︎ 戻る](https://github.com/oti/gulp-imagemin-with-esm)
