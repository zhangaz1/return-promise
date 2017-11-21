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
fs.readFile
  .returnPromise('/etc/hosts', 'utf8')
	.then(data => console.log(data))
	.catch(err => console.log(err));
```


### if you need use this.xxx in the fun:

```

		const user = {
			name: 'zs',
			sayHi: function (something, cb) {
				cb(null, `Hi, ${something}, i'm ${this.name},`);
			}
		};

		user.sayHi('world', console.log.bind(console));

		it('should can transport this', function () {
			user.sayHi.bind(user) // *** bind to this ***
				.returnPromise('world')
				.then(console.log.bind(console))
				.catch(console.error.bind(console));
		});


```