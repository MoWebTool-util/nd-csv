# nd-csv

[![spm version](http://spm.crossjs.com/badge/nd-list)](http://spm.crossjs.com/package/nd-list)

> Parse and encode CSV files

## 安装

```bash
$ spm install nd-csv --save
```

## 使用

```js
var List = require('nd-list');
// use List
new List({
  proxy: new SomeModel({...})
}).on('drain', function() {
  console.log(this.get('list'));
});
```
