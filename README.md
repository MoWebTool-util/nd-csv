# nd-csv

[![spm version](http://spm.crossjs.com/badge/nd-csv)](http://spm.crossjs.com/package/nd-csv)

> Parse and encode CSV files

## 安装

```bash
$ spm install nd-csv --save
```

Instantiation
-------------

Create a CSV instance with `var csv = new CSV(data);`, where `data` is a plain-text CSV string. You can supply options with the format `var csv = new CSV(data, { option: value });`.


Options
-------

- **`cast`**: `true` to automatically cast numbers and booleans to their JavaScript equivalents. `false` otherwise. Supply your own `array` to override autocasting. Defaults to `true`.
- **`lineDelimiter`**: The `string` that separates lines from one another. If parsing, defaults to autodetection. If encoding, defaults to `'\r\n'`.
- **`cellDelimiter`**: A 1-character-long `string` that separates values from one another. If parsing, defaults to autodetection. If encoding, defaults to `','`.
- **`header`**: `true` if the first row of the CSV contains header values, or supply your own `array`. Defaults to `false`.

You can update an option's value any time after instantiation with `csv.set(option, value)`.

## 使用

```javascript
var CSV = require('nd-csv');

// The instance will set itself up for parsing or encoding on instantiation,
// which means that each instance can only either parse or encode.
// The `options` object is optional
var csv = new CSV(data, [options]);

// If the data you've supplied is an array,
// CSV#encode will return the encoded CSV.
// It will otherwise fail silently.
var encoded = csv.encode();

// If the data you've suopplied is a string,
// CSV#parse will return the parsed CSV.
// It will otherwise fail silently.
var parsed = csv.parse();

// The CSV instance can return the record immediately after
// it's been encoded or parsed to prevent storing the results
// in a large array by calling CSV#forEach and passing in a function.
csv.forEach(function(record) {
  // do something with the record
});

// CSV includes some convenience class methods:
CSV.parse(data, options); // identical to `new CSV(data, options).parse()`
CSV.encode(data, options); // identical to `new CSV(data, options).encode()`
CSV.forEach(data, options, callback); // identical to `new CSV(data, options).forEach(callback)`

// For overriding automatic casting, set `options.cast` to an array.
// For `parsing`, valid array values are: 'Number', 'Boolean', and 'String'.
CSV.parse(data, { cast: ['String', 'Number', 'Number', 'Boolean'] });
// For `encoding`, valid array values are 'Array', 'Object', 'String', 'Null', and 'Primitive'.
CSV.encode(data, { cast: ['Primitive', 'Primitive', 'String'] });
```