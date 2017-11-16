# returnPromise

simple to the callbackify functions to promisify:

## Install
```
$ npm install --save return-promise
```

## Usage

```js
fs = require('fs')
fs.readFile('/etc/hosts', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
```

=>

```js
require('return-promise');

fs = require('fs');
fs.readFile.returnPromise('/etc/hosts', 'utf8')
	.then(data => console.log(data))
	.catch(err => console.log(err));
```
