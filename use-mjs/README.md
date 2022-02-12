# タスクファイルの拡張子を全て `.mjs` にする

- `gulpfile.mjs`
- `./task/image.mjs`

にリネームすれば esm モジュール不要で gulp-iamgemin v8.0.0 でもエラーが起きません。

```zsh
npm ci
npx gulp
[16:05:45] Using gulpfile ~/hoge/gulp-imagemin-with-esm/use-mjs/gulpfile.mjs
[16:05:45] Starting 'default'...
[16:05:45] Starting 'image'...
[16:05:46] gulp-imagemin: Minified 1 image (saved 5.54 MB - 92.2%)
[16:05:46] Finished 'image' after 858 ms
[16:05:46] Finished 'default' after 859 ms
```

Success!

[↩︎ 戻る](https://github.com/oti/gulp-imagemin-with-esm)
