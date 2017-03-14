'use strict';

global.$ = {
	package: require('./package.json'),
	config: require('./gulp/config'),
	path: {
		task: require('./gulp/paths/tasks.js'),
		jsFoundation: require('./gulp/paths/js.foundation.js'),
		cssFoundation: require('./gulp/paths/css.foundation.js'),
		app: require('./gulp/paths/app.js')
	},
	gulp: require('gulp'),
	merge: require('merge-stream'),
	del: require('del'),
	fs: require('file-system'),
	browserSync: require('browser-sync').create(),
	nodemon: require('nodemon'),
	gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function (taskPath) {
	require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
	'clean',
	$.gulp.parallel(
		'sass',
		'js:foundation',
		'js:process',
		'copy:image',
		'copy:fonts',
		'copy:js',
		'css:foundation',
		'sprite:svg',
		'sprite:png'
	),
	$.gulp.parallel(
		'nodemon'
	),
	$.gulp.parallel(
		'watch',
		'serve'
	)
));
