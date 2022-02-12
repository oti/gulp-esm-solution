# gulpfile.esm.js と gulp-imagemin v8.0.0 で起こるエラーの再現

```zsh
npm ci
npx gulp
```

初回は下記の `ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING` エラーが表示され、

```zsh
[01:23:45] Requiring external module esm
TypeError [ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING]: A dynamic import callback was not specified.
    at new NodeError (node:internal/errors:371:5)
    at importModuleDynamicallyCallback (node:internal/process/esm_loader:39:9)
    at eval (eval at <anonymous> (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/gulp-cli/lib/shared/require-or-import.js:10:15), <anonymous>:3:1)
    at requireOrImport (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/gulp-cli/lib/shared/require-or-import.js:24:7)
    at execute (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/gulp-cli/lib/versioned/^4.0.0/index.js:37:3)
    at Liftoff.handleArguments (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/gulp-cli/index.js:211:24)
    at Liftoff.execute (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/liftoff/index.js:201:12)
    at module.exports (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/flagged-respawn/index.js:51:3)
    at Liftoff.<anonymous> (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/liftoff/index.js:191:5)
    at /Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/liftoff/index.js:149:9 {
  code: 'ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING'
}
```

2 回目以降は `Invalid host defined options` エラーが表示される。

```zsh
[19:04:07] Requiring external module esm
TypeError: Invalid host defined options
    at eval (eval at <anonymous> (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/gulp-cli/lib/shared/require-or-import.js:10:15), <anonymous>:3:1)
    at requireOrImport (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/gulp-cli/lib/shared/require-or-import.js:24:7)
    at execute (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/gulp-cli/lib/versioned/^4.0.0/index.js:37:3)
    at Liftoff.handleArguments (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/gulp-cli/index.js:211:24)
    at Liftoff.execute (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/liftoff/index.js:201:12)
    at module.exports (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/flagged-respawn/index.js:51:3)
    at Liftoff.<anonymous> (/Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/liftoff/index.js:191:5)
    at /Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/liftoff/index.js:149:9
    at /Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/v8flags/index.js:162:14
    at /Users/hoge/gulp-imagemin-with-esm/error-reenactment/node_modules/v8flags/index.js:41:14
```

## どうしてエラー？

gulp-imagemin v8.0.0 は「Pure ESM Package」だそうです。

- https://github.com/sindresorhus/gulp-imagemin/issues/362
- https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

gulpfile.esm.js が要求する esm モジュールは `import/export` 構文しかサポートされておらず、それが原因で gulp-imagemin 内部の処理でエラーが起きたと思われます。

[Transpilaton - JavaScript and Gulpfiles | gulp](https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles#transpilation)

> Most new versions of node support most features that TypeScript or Babel provide, except the `import`/`export` syntax. When only that syntax is desired, rename to `gulpfile.esm.js` and install the esm module.

ということで、 `gulpfile.esm.js`（esm モジュール利用）では gulp-imagemin v8.0.0 は動かない、がファイナルアンサーです。

[↩︎ 戻る](https://github.com/oti/gulp-imagemin-with-esm)
