# gulp-imagemin with ESM

gulp-imagemin v8.0.0 を ESM 環境下で利用する際の、エラー再現と解決策 3 つを提示するリポジトリ。

## gulp を ESM 化したいオレたちは公式のアナウンスの元 gulpfile.esm.js を始めた

[Transpilation - JavaScript and Gulpfiles | gulp](https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles#transpilation)

```zsh
mv gulpfile.js gulpfile.esm.js
npm i -D esm gulp gulp-imagemin
```

```js
// gulpfile.esm.js
import gulp from "gulp";
import { image } from "./task/image.js";

export default gulp.series(image);
```

```js
// ./task/image.js
import gulp from "gulp";
import imagemin, { mozjpeg } from "gulp-imagemin";

export const image = () =>
  gulp
    .src("./src/image/**/*")
    .pipe(imagemin([mozjpeg({ quality: 50 })]))
    .pipe(gulp.dest("./dist/image/"));
```

そして `npx gulp` を実行するとエラーに……。（ [`./error-reenactment/`](./error-reenactment/) ディレクトリで再現可能）

## 解決方法

1. gulp-imagemin を v7.1.0 にダウングレードする [`./use-gulp-imagemin-v7/`](./use-gulp-imagemin-v7/)
2. package.json に `"type": "module"` を追加する [`./use-type-module/`](./use-type-module/)
3. タスクファイルの拡張子を全て `.mjs` にする [`./use-mjs/`](./use-mjs)

解決方法の詳細は各ディレクトリの README.md を参照してください。これらは gulp で ESM を使いたい人向けの方法です。

「gulp は CommonJS 構文のままで gulp-imagmin を v8.0.0 にあげたらエラーが出たが、gulp を ESM にしたくない人」は、**gulp-imagemin を v8.0.0 にアップデートせず、v7.1.0 のまま使う以外に道はありません。**

https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

> Stay on the existing version of the package until you can move to ESM.

## No gulpfile found エラー

gulp v4 で `.mjs` や `type: module` を利用したいのに `No fulpfile found` エラーになる場合があります。

おそらく gulp-cli のバージョンが v2.3.0 になっていないと思われます。

```zsh
npx gulp
[16:05:46] No gulpfile found

npx gulp -v
CLI version: 2.2.0 // <= bad
Local version: 4.0.2
```

package-lock.json を削除してから `npm i` を実行すると、gulp-cli もアップデートされます。

```zsh
rm -f package-lock.json
npm i
npx gulp -v

CLI version: 2.3.0 // <= good
Local version: 4.0.2
```

オッケー！

---

Special thanks [@watilde](https://github.com/watilde)
