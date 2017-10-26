'use strict';


gulp.task('watch.src', cb => {

	plugins.watch(config.js.src, function() {
		gulp.start('change');
	});

	cb();
});
