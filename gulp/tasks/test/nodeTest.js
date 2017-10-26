'use strict';


gulp.task('nodeTest', cb => {
	return gulp
		.src(config.test.src)
		.pipe(plugins.mocha())
		.on('error', function() {
			console.log(arguments);
		})
		.on('end', function(err) {
			if(err) {
				console.log(err);
			}

			// cb(null); // duplicate end
		});
});
