# returnPromise

simple to to the callbackify functions to promisify:

```
fs = require('fs')
fs.readFile('/etc/hosts', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
```

=>

```
require('return-promise');

fs = require('fs');
fs.readFile.returnPromise('/etc/hosts', 'utf8')
	.then(data => console.log(data))
	.catch(err => console.log(err));
```
