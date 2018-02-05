module.exports = function(grunt) {
	'use strict';

	var moduleFilePrefix = 'ttui-clm-';

	grunt.initConfig({
		watch: {
			js: {
				files: [
					'scripts/*.js'
				],
				options: {
					livereload: true,
					interval: 500,
					debounceDelay: 500
				}
			}
		},

		jshint: {
			scripts: {
				src: [
					'src/scripts/*.js'
				]
			}
		},

		concat: {
			dist: {
				options: {
					banner:
						'/* commonjs package manager support (eg componentjs) */\n' +
						'if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){\n' +
						'	module.exports = \'@@@@__SOURCE_FILENAME__\';\n' +
						'}\n\n' +
						'(function (window, angular, undefined) {\n' +
						'	"use strict";\n\n',

					footer:
						'\n'+
						'return angular;\n'+
						'})(window, window.angular);',

					sourceMap: false, // uglify does this

					process: function(src, filepath) {
						return '\n// Source: ' + filepath + '\n' + src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
					}
				},

				files: [
					{
						expand: true,
						cwd: 'src/scripts/',
						src: [
							'common/polyfills/Function.name.js',
							'**/*.js',
							'!*.js'
						],
						dest: 'dist/scripts/',
						rename: function(dest, src) {
							return dest+moduleFilePrefix+src.split('/')[0]+'.js';
						}
					}
				]
			},

			// concatenate all generated modules to 1 file
			library: {
				options: {},
				files: [{
					src: [
						'dist/scripts/*.js',
						'!dist/scripts/*min.js'
					],
					dest: 'dist/scripts/tt-ui-clm-library.js'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('build', [
		'concat:dist',
	]);
};
