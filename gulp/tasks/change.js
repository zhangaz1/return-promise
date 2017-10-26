'use strict';


gulp.task('change', cb => {
	return plugins
		.sequence('allTest')
		(cb);
});
