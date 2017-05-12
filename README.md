# require-dir-as-map

[![Build
Status](https://travis-ci.org/krolow/require-dir-as-map.svg?branch=master)](https://travis-ci.org/krolow/require-dir-as-map)
[![npm
version](https://badge.fury.io/js/require-dir-as-map.svg)](http://badge.fury.io/js/require-dir-as-map)


> Require a directory and get back a `new Map()`


### Usage

```js
const requireDirAsMap = require('require-dir-as-map');


const filter = (file) => {
  return file;
};

const map = ({ file, module }) {
  return module.somethingThere || file.split('.')[0];
}

requireDirAsMap('/my-directory/', { filter, map });

```

## License

Licensed under <a href="http://krolow.mit-license.org/">The MIT License</a>
Redistributions of files must retain the above copyright notice.

## Author

Vinícius Krolow - krolow[at]gmail.com
