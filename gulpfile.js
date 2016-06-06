/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var gulp = require('gulp');
var tsb = require('gulp-tsb');
var assign = require('object-assign');
var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var rimraf = require('rimraf');

gulp.task('clean-release', function(cb) { rimraf('release', { maxBusyTries: 1 }, cb); });
gulp.task('release', ['clean-release','compile'], function() {
	function bundleOne(moduleId, exclude) {
		return rjs({
			baseUrl: '/out/',
			name: 'vs/basic-languages/' + moduleId,
			out: moduleId + '.js',
			exclude: exclude,
			paths: {
				'vs/basic-languages': __dirname + '/out'
			}
		})
	}

	return merge(
			bundleOne('src/monaco.contribution'),
			bundleOne('src/bat')
		)
		.pipe(uglify())
		.pipe(gulp.dest('./release/'));
});


var compilation = tsb.create(assign({ verbose: true }, require('./tsconfig.json').compilerOptions));

var tsSources = require('./tsconfig.json').filesGlob;

function compileTask() {
	return merge(
		gulp.src(tsSources, { base: '.' }).pipe(compilation())
	)
	.pipe(gulp.dest('out'));
}
gulp.task('clean-out', function(cb) { rimraf('out', { maxBusyTries: 1 }, cb); });
gulp.task('compile', ['clean-out'], compileTask);
gulp.task('compile-without-clean', compileTask);
gulp.task('watch', ['compile'], function() {
	gulp.watch(tsSources, ['compile-without-clean']);
});
