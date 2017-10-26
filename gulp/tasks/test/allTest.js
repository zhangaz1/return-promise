'use strict';


gulp.task('allTest', cb => {
	return plugins
		.sequence('nodeTest')
		(cb);
});
