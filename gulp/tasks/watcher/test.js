'use strict';


gulp.task('watch.test', cb => {

	plugins.watch(config.test.src, function() {
		gulp.start('change');
	});

	cb();
});
