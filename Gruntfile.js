module.exports = function(grunt) {
	'use strict';

	var moduleFilePrefix = 'ttui-clm-';

	var modules = {
		'feasibility-search': 'TTUI-CLM-FeasibilitySearch',
	};

	grunt.initConfig({
		jshint: {
			scripts: {
				src: [
					'src/scripts/*.js'
				]
			}
		},

		clean: {
			dist: 'dist',
			server: '.tmp'
		},

		copy: {
			dist: {
				expand: true,
				dot: true,
				cwd: 'src',
				dest: 'dist',
				src: [
					'bower_components/**/*',
					'scss/**/*'
				]
			},
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
							'dist/temp/scripts/**/*.js',
							'!*.js'
						],
						dest: 'dist/scripts/',
						rename: function(dest, src) {
							var moduleName = src.split('/')[0];
							return dest + moduleName + '/' + moduleFilePrefix + moduleName + '.js';
						}
					}
				]
			},

			library: {
				options: {},
				files: [{
					src: [
						'src/scripts/**/*',
					],
					dest: 'dist/scripts/' + moduleFilePrefix + 'library.js'
				}]
			}
		},
		
		uglify: {
			dist: {
				options: {
					preserveComments: 'some',
					sourceMap: true,
					screwIE8: true
				},
				files: [{
					expand: true,
					cwd: 'dist/scripts/',
					src: [
						'**.js'
					],
					dest: 'dist/scripts/',
					ext: '.min.js',
					extDot: 'last'
				}]
			}
		},

		ngtemplates: {
			dist: {
				options: {
					module: function(src) {
						var cwd = grunt.template.process('src/scripts/');
						var modulePath = src.replace(cwd, '').split('/')[0];
						return modules[modulePath];
					},
					prefix: 'scripts',
					bootstrap: function(moduleName, script) {

						var header =
							'angular.module(\''+moduleName+'\').run([\'$templateCache\', function($templateCache) {\n';

						var footer =
							'}]);\n' +
							'return angular;';
						var cwd = grunt.template.process('app');
						script = script.replace(new RegExp(cwd, 'g'), '');
						script = script.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
						console.log(script);
						return grunt.template.process(header) + script + footer;
					},
					htmlmin: {
						collapseBooleanAttributes: false,
						collapseWhitespace: true,
						removeAttributeQuotes: false,
						removeComments: true,
						removeEmptyAttributes: false,
						removeRedundantAttributes: false,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true
					}
				},
				files: [
					{
						expand: true,
						cwd: 'src/scripts/',
						src: [
							'**/*.html'
						],
						dest: 'dist/temp/scripts/',
						rename: function(dest, src) {
							return dest + src.split('/')[0] + '/' + src.split('/')[0]+'.tpl.js';
						}
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-angular-templates');

	grunt.registerTask('build', [
		'clean',
		'copy:dist',
//		'ngtemplates',
		'concat:dist',
		'concat:library',
//		'uglify'
	]);
};
