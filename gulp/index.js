'use strict';


require('./imports.js');
require('./config.js');

var loadTasks = require('require-dir');
loadTasks('./tasks', {
	recurse: true
});
