module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	var modules = {
		'wizard-manager': 'TT-UI.WizardManager.Tpl',
		'auth': 'TT-UI.Auth.Tpl',
		'common': 'TT-UI.Common.Tpl',
		'form': 'TT-UI.Form.Tpl',
		'hierarchy-tree': 'TT-UI.HierarchyTree.Tpl',
		'multiselect-hierarchy-tree': 'TT-UI.MultiselectHierarchyTree.Tpl'
	};

	var moduleFilePrefix = 'ttui-';

	// Define the configuration for all the tasks
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Project settings
		yeoman: {
			// configurable paths
			app: require('./bower.json').appPath || 'src',
			dist: 'dist',
			docs: 'docs',
			docsdist: '_sites',
			examples: 'examples'
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			sass: {
				files: [
					'<%= yeoman.app %>/{scss,sass}/**/*.{css,sass,scss}',
					'<%= yeoman.app %>/bower_components/**/*.{css,sass,scss}'
				],
				tasks: ['sass:server', 'rtlcss:src', 'postcss:server']
			},
			jekyll : {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.docs %>/**/*.{html,md,js}',
					'<%= yeoman.examples %>/**/*.{html,md,js}',
					'<%= yeoman.app %>/{scss,sass}/**/*.{css,sass,scss}',
					'<%= yeoman.app %>/scripts/**/*.{js,html}'
				],
				tasks: [
					'concurrent:dist',
					'rtlcss:dist',
					'postcss:dist',
					'jekyll:docs',
					'ngtemplates',
					'concat:dist',
					'concat:library',
					'copy:docs-dist',
					'copy:examples',
//					'copy:theme-example',
					'copy:images'
				]
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/**/*.html',
					'<%= yeoman.app %>/{css,sass}/**/*.{css,sass,scss}',
					'<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
				]
			},
			'scripts-quickdist': {
				files: [
					'<%= yeoman.app %>/scripts/**/*.js'
				],
				tasks: ['concat:dist', 'concat:library']
			},
			'sass-quickdist': {
				files: [
					'<%= yeoman.app %>/{scss,sass}/**/*.{css,sass,scss}',
					'<%= yeoman.app %>/bower_components/**/*.{css,sass,scss}'
				],
				tasks: ['sass:dist', 'rtlcss:dist', 'postcss:dist', 'copy:quickdist']
			},
			'html-quickdist': {
				files: [
					'<%= yeoman.app %>/scripts/**/*.tpl.html',
				],
				tasks: ['ngtemplates']
			},
		},

		// Extension for watch. Allows selecting watches to run.
		focus: {
			serve: {
				exclude: ['scripts-quickdist']
			},
			quickdist: {
				include: ['scripts-quickdist','sass-quickdist','html-quickdist']
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 8000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35730
			},
			docs: {
				options: {
					base: '<%= yeoman.docsdist %>'
				}
			},
			livereload: {
				options: {
					base: '<%= yeoman.app %>'
				}
			}
		},


		// Empties folders to start fresh
		clean: {
			dist: '<%= yeoman.dist %>',
			docs: '<%= yeoman.docsdist %>',
			server: '.tmp'
		},

		// Install bower components
		// Do manually when needed
		// bower: {
		// 	install: {
		// 		options: {
		// 			copy: false
		// 		}
		// 	}
		// },

		// Automatically inject Bower components into the app
		wiredep: {
			app: {
				src: [
					'<%= yeoman.app %>/*.html'
				],
				options: {
					exclude: [
						'bower_components/bootstrap/'
					]
				}
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		sass: {
			options: {
				includePaths: [
					'<%= yeoman.app %>/bower_components'
				],
				sourceMap: true,
				functions: {
					'base64EncodeReplace($svgFile,$keyValues)': function(svgFile, keyValues) {
						var sass = require('node-sass');
						var fs = require('fs');

						var path = './src/images/assets/' + svgFile.getValue();
						var data = fs.readFileSync(path,'utf8');

						var utils = {
							replace: function (string, x1, x2) {
								var regexp = '(' + x1 + ':.*?[;])';
								// replace all matches
								return string.replace(new RegExp(regexp, 'g'), x1 + ':' + x2 + ';');
							},
							toMap: function (string) {
								var mapped = {};
								// strip unwanted chars
								string = string.replace(/[()\s]/g, '');
								// create map
								string.replace(/([^:,]+):([^,]+)/g, function ($0, param, value) {
									mapped[param] = value;
								});
								return mapped;
							}
						};

						var mapped = utils.toMap(keyValues.getValue());
						Object.keys(mapped).forEach(function (key) {
							data = utils.replace(data, key, mapped[key]);
						});

						var decoded = new Buffer(data).toString('base64');
						var output = new sass.types.String(decoded);

						output.setValue(decoded);
						return output;
					}
				}
			},
			dist: {
				options: {
					outputStyle: 'compressed'
				},

				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/sass',
					src: ['tecnotree-ui-library.scss'],
					dest: '<%= yeoman.dist %>/css',
					ext: '.css'
				}]
			},
			server: {
				options: {
					sourceComments: true
				},

				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/sass',
					src: ['tecnotree-ui-library.scss'],
					dest: '<%= yeoman.app %>/css',
					ext: '.css'
				}]
			}
		},

		// // Download google fonts
		// googlefonts: {
		// 	build: {
		// 		options: {
		// 			fontPath: '<%= yeoman.app %>/fonts/open-sans/',
		// 			// cssFile: '<%= yeoman.app %>/fonts/open-sans/open-sans.css', // once
		// 			formats: {
		// 				eot: true,
		// 				ttf: true,
		// 				woff: true,
		// 				woff2: true,
		// 				svg: true
		// 			},
		// 			fonts: [{
		// 				family: 'Open Sans',
		// 				styles: [
		// 					'300italic', '400italic', '600italic', '700italic', '800italic', 400, 300, 600, 700, 800
		// 				]
		// 			}]
		// 		}
		// 	}
		// },

		// Parse CSS and add vendor prefixes to CSS rules using values from http://caniuse.com
		postcss: {
			options: {
				processors: [
					require('autoprefixer')({
						browsers: ['last 2 versions']
					})
				],
				map: true
			},
			dist: {
				src: '<%= yeoman.dist %>/css/*.css'
			},
			server: {
				src: '<%= yeoman.app %>/css/*.css'
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: [
				'<%= yeoman.app %>/*.html'
			],
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: [
				'<%= yeoman.dist %>/*.html'
			],
			css: [
				'<%= yeoman.dist %>/css/**/*.css',
				'<%= yeoman.dist %>/css/*.css'
			],
			options: {
				assetsDirs: ['<%= yeoman.dist %>']
			}
		},

		// Mininfy vendor.css
		cssmin: {
			options: {
				sourceMap: true
			},
			target: {
				files: [{
					src: '<%= yeoman.app %>/css/vendor.css',
					dest: '<%= yeoman.dist %>/css/vendor.min.css'
				}]
			}
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '**/*.{png,jpg,jpeg,gif,svg}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},

		// Minify JSON files
		'json-minify': {
			dist: {
				files: '<%= yeoman.dist %>/data/**/*.json'
			}
		},

		targethtml: {
			dist: {
				files: {
					'<%= yeoman.dist %>/index.html': '<%= yeoman.dist %>/index.html'
				}
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				expand: true,
				dot: true,
				cwd: '<%= yeoman.app %>',
				dest: '<%= yeoman.dist %>',
				src: [
					'*.{ico,png,svg,txt}',
					'.htaccess',
					'*.html',
					'sass/**/*.scss',
					'bower_components/**/*',
					'images/**/*',
					'fonts/**/*'
				]
			},
			// 'theme-example': {
			// 	expand: true,
			// 	cwd: '<%= yeoman.dist %>',
			// 	src: ['**/*'],
			// 	dest: '<%= yeoman.docsdist %>/examples/ui'
			// },
			'docs-dist': {
				expand: true,
				cwd: '<%= yeoman.dist %>',
				src: ['**/*'],
				dest: '<%= yeoman.docsdist %>/dist'
			},
			examples: {
				expand: true,
				src: [
					'examples/wizzard/**',
					'examples/screenshots/**',
					'examples/hierarchy-tree/**',
					'examples/multiselect-hierarchy-tree/**',
					'examples/grid/**',
					'examples/simple-timeline/**'
					],
				dest: '<%= yeoman.docsdist %>/'
			},
			images: {
				expand: true,
				cwd: '<%= yeoman.app %>',
				src: 'images/**/*',
				dest: '<%= yeoman.docsdist %>/'
			},
			'quickdist': {
				expand: true,
				dot: true,
				cwd: '<%= yeoman.app %>',
				dest: '<%= yeoman.dist %>',
				src: [
					'*.{ico,png,svg,txt}',
					'.htaccess',
					'*.html',
					'sass/**/*.scss',
					'images/**/*'
				]
			}
		},

		ngtemplates: {
			dist: {
				options: {
					module: function(src) {
						var cwd = grunt.template.process('<%= yeoman.app %>/scripts/');
						var modulePath = src.replace(cwd, '').split('/')[0];

						return modules[modulePath];
					},
					prefix: 'scripts',
					bootstrap: function(moduleName, script) {

						var header =
							'/*! TT-UI Lib <%= pkg.version %> */\n\n' +
							'/* commonjs package manager support (eg componentjs) */\n' +
							'if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){\n' +
							'	module.exports = \'@@@@__SOURCE_FILENAME__\';\n' +
							'}\n\n' +
							'(function (window, angular, undefined) {\n' +
							'	"use strict";\n\n'+
							'   angular.module(\''+moduleName+'\', []).run([\'$templateCache\', function($templateCache) {\n';

						var footer =
							'\n'+
							'}]);\n' +
							'return angular;\n' +
							'})(window, window.angular);';

						var cwd = grunt.template.process('<%= yeoman.app %>/');
						script = script.replace(new RegExp(cwd, 'g'), '');

						script = script.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');

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
						cwd: '<%= yeoman.app %>/scripts/',
						src: [
							'**/*.html'
						],
						dest: '<%= yeoman.dist %>/scripts/',
						rename: function(dest, src) {
							return dest+moduleFilePrefix+src.split('/')[0]+'.tpl.js';
						}
					}
				]
			}
		},

		concat: {
			dist: {
				options: {
					banner:
						'/*! TT-UI Lib <%= pkg.version %> */\n\n' +
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
						cwd: '<%= yeoman.app %>/scripts/',
						src: [
							'common/polyfills/Function.name.js',
							'**/*.js',
							'!*.js'
						],
						dest: '<%= yeoman.dist %>/scripts/',
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
						'<%= yeoman.dist %>/scripts/*.js',
						'!<%= yeoman.dist %>/scripts/*min.js'
					],
					dest: '<%= yeoman.dist %>/scripts/tecnotree-ui-library.js'
				}]
			},

			// concatenate vendor css
			'vendor-app': {
				files: [{
					src: [
						'<%= yeoman.app %>/bower_components/bootstrap-additions/dist/bootstrap-additions.css',
						'<%= yeoman.app %>/bower_components/angular-motion/dist/angular-motion.css'
					],
					dest: '<%= yeoman.app %>/css/vendor.css'
				}]
			},
			'vendor-dist': {
				files: [{
					src: [
						'<%= yeoman.app %>/bower_components/bootstrap-additions/dist/bootstrap-additions.css',
						'<%= yeoman.app %>/bower_components/angular-motion/dist/angular-motion.css'
					],
					dest: '<%= yeoman.dist %>/css/vendor.css'
				}]
			}
		},

		replace: {
			dist: {
				options: {
					patterns: [
						{
							match: /@{2}([a-z0-9\,\-\.]+)\.js/ig,
							replacement: function(search, match) {
								return  match;
							}
						}
					]
				},
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.dist %>/scripts/',
						src: ['*.js'],
						dest: '<%= yeoman.dist %>/scripts/'
					}
				]
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
					cwd: '<%= yeoman.dist %>/scripts/',
					src: [
						'**.js'
					],
					dest: '<%= yeoman.dist %>/scripts/',
					ext: '.min.js',
					extDot: 'last'
				}]
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'sass:server'
			],
			dist: [
				'sass:dist',
				'imagemin'
			]
		},

		jekyll: {
			options: {
				config: '_config.yml'
			},
			docs :{}
		},

		compress: {
			main: {
				options: {
					archive: '<%= yeoman.dist %>/tt-ui-lib-<%= pkg.version %>-dist.zip',
					mode: 'zip',
					level: 9,
					pretty: true
				},
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.dist %>',
						src: ['**'],
						dest: 'tt-ui-lib-<%= pkg.version %>-dist'
					}
				]
			},
			examples: {
				options: {
					archive: '<%= yeoman.docsdist %>/examples/hierarchy-tree/hierarchy-tree-src.zip',
					mode: 'zip',
					pretty: true
				},
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.docsdist %>/examples/hierarchy-tree/',
						src: ['**'],
						dest: '.'
					}
				]
			},
			multiselectHierarchyTreeExample: {
				options: {
					archive: '<%= yeoman.docsdist %>/examples/multiselect-hierarchy-tree/multiselect-hierarchy-tree-src.zip',
					mode: 'zip',
					pretty: true
				},
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.docsdist %>/examples/multiselect-hierarchy-tree/',
						src: ['**'],
						dest: '.'
					}
				]
			}
		},

		// Coding rules checker
		jscs: {
			src: ['<%= yeoman.app %>/scripts/**/*.js']
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			scripts: {
				src: [
					'<%= yeoman.app %>/scripts/**/*.js'
				]
			},
			tests: {
				options: {
					jshintrc: '<%= yeoman.app %>/test/unit/.jshintrc'
				},
				src: ['<%= yeoman.app %>/test/unit/**/*.js']
			}
		},

		// Check HTML
		htmlangular: {
			options: {
				doctype: false,
				tmplext: 'tpl.html',
				relaxerror: [
					'for attribute translate on element',
					'Attribute translate not allowed',
					'Empty heading',
					'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
					'Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections.',
					'Attribute href without an explicit value seen.',
					'Bad value {{form.type}} for attribute type on element input',
					'Element li not allowed as child of element body in this context',
					'Element img is missing required attribute src'
				],
				customtags: [
					'pagination', 'tabset', 'nav-menu', 'breadcrumbs', 'flash-message',
					'action-links', 'accordion', 'sf-decorator', 'wizard', 'validation-status',
					'multiselect-dropdown', 'oauth', 'charges-table', 'offerings-summary-table','summary-item'
				],
				customattrs: [
					'translate', 'translate-attr-*', 'spinner', 'post-message', 'datepicker',
					'date-*', 'today', 'route-label', 'sf-*', 'schema-*', 'auto-tab-*', 'sfx-*',
					'bs-*', 'st-*', 'step', 'reload-options', 'auto-format', 'typeahead*'
				],
				reportpath: 'dist/reports/htmlangular/report.json'
			},

			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/*.html',
						'<%= yeoman.dist %>/scripts/**/*.html'
					]
				}
			},

			local: {
				files: {
					src: [
						'<%= yeoman.app %>/*.html',
						'<%= yeoman.app %>/scripts/**/*.html'
					]
				}
			}
		},

		// Generate "LTR to RTL" converted CSS
		rtlcss: {
			dist: {
				// task options
				options: {
					// generate source maps
					map: { inline: false },
					// rtlcss options
					opts: {
						clean: false
					},
					// rtlcss plugins
					plugins:[],
					// save unmodified files
					saveUnmodified: true,
				},
				files: [{
					'<%= yeoman.dist %>/css/tecnotree-ui-library-rtl.css': '<%= yeoman.dist %>/css/tecnotree-ui-library.css'
				}]
			},
			src: {
				// task options
				options: {
					// generate source maps
					map: { inline: false },
					// rtlcss options
					opts: {
						clean: false
					},
					// rtlcss plugins
					plugins:[],
					// save unmodified files
					saveUnmodified: true,
				},
				files: [{
					'<%= yeoman.app %>/css/tecnotree-ui-library-rtl.css': '<%= yeoman.app %>/css/tecnotree-ui-library.css'
				}]
			}
		},

		// Test settings
		karma: {
			dist: {
				configFile: 'karma.conf.js',
				browsers: ['PhantomJS'],
				autoWatch: true,
				singleRun: false
			},
			unit: {
				configFile: 'karma.conf.js',
				browsers: ['PhantomJS'],
				singleRun: true
			},
			'jenkins-ie': {
				configFile: 'jenkins.conf.js',
				browsers: ['IE10', 'IE11'],
				singleRun: true
			},
			jenkins: {
				configFile: 'jenkins.conf.js'
			}
		},

		// Update version (major, minor or patch)
		version: {
			project: {
				src: ['package.json', 'bower.json']
			}
			// does not work
			// yaml: {
			// 	options: {
			// 		pkg: 'package.json',
			// 		prefix: 'current_version[:=]\s*',
			// 		replace: '[0-9a-zA-Z\-_\+\.]+'
			// 	},
			// 	src: ['./_config.yml']
			// }
		}
	});

	grunt.registerTask('jshint:all', function() {
		grunt.log.warn('The `jshint:all` task has been deprecated. Use `grunt jshint` instead.');
		grunt.task.run(['jshint']);
	});

	grunt.registerTask('docs', ['clean:docs', 'jekyll:docs','copy:docs-dist','copy:examples',/*'copy:theme-example',*/'copy:images', 'compress:examples', 'compress:multiselectHierarchyTreeExample']);

	grunt.registerTask('serve', function(target) {

		if (target === 'docs') {
			return grunt.task.run([
				'clean:docs',
				'concurrent:dist',
				'rtlcss:dist',
				'postcss:dist',
				'jekyll:docs',
				'copy:docs-dist',
				'copy:examples',
//				'copy:theme-example',
				'copy:images',
				'compress:examples',
				'compress:multiselectHierarchyTreeExample',
				'connect:docs',
				'watch:jekyll'
			]);
		}

		// quick, but 'dirty' build only for development
		if (target === 'quickdist') {
			return grunt.task.run([
				'ngtemplates',
				'concat:dist',
				'replace',
				'concat:library',
				'copy:quickdist',
				'focus:quickdist'
			]);
		}

		grunt.task.run([
			'clean:server',
			'wiredep',
			'concurrent:server',
			'rtlcss:src',
			'postcss:server',
			'connect:livereload',
			'focus:serve'
		]);
	});

	grunt.registerTask('serve-docs', ['serve:docs']);
	grunt.registerTask('serve-ui', ['serve']);

	grunt.registerTask('build', [
		'jshint',
		'clean:dist',
		// 'googlefonts', // once
		'wiredep',
		'useminPrepare',
		'concurrent:dist',
		'concurrent:server',
		'ngtemplates',
		'concat:dist',
		'replace',
		'concat:library',
		'concat:vendor-app',
		'concat:vendor-dist',
		'uglify',
		'copy:dist',
		'copy:images',
		'targethtml:dist',
		'usemin',
		'cssmin',
		'docs',
		'rtlcss:dist',
		'postcss:dist'
	]);

	grunt.registerTask('default', [
		'build'
	]);

};
