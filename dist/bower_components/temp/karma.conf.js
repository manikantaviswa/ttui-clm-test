// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
	'use strict';

	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
			'src/bower_components/angular/angular.js',
			'src/bower_components/angular-cookies/angular-cookies.js',
			'src/bower_components/angular-resource/angular-resource.js',
			'src/bower_components/angular-sanitize/angular-sanitize.js',
			'src/bower_components/angular-translate/angular-translate.js',
			'src/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
			'src/bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
			'src/bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
			'src/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
			'src/bower_components/angular-ui-router/release/angular-ui-router.js',
			'src/bower_components/jquery/jquery.js',
			'src/bower_components/angular-mocks/angular-mocks.js',
			'src/bower_components/angular-strap/dist/angular-strap.js',
			'src/bower_components/angular-strap/dist/angular-strap.tpl.js',
			'src/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
			'src/bower_components/angular-animate/angular-animate.js',
			'src/bower_components/a0-angular-storage/dist/angular-storage.js',
			'src/bower_components/a0-angular-storage/dist/angular-storage.js',
			'src/bower_components/angular-smart-table/dist/smart-table.js',
			'src/bower_components/ngstorage/ngStorage.js',
			'src/bower_components/oauth-ng/dist/oauth-ng.js',
			'src/bower_components/tv4/tv4.js',
			'src/bower_components/objectpath/lib/ObjectPath.js',
			'src/bower_components/angular-schema-form/dist/schema-form.js',
			'src/bower_components/momentjs/min/moment.min.js',
			'src/bower_components/moment-jalaali/build/moment-jalaali.js',

			'src/scripts/**/*.js',
			'src/scripts/**/*.tpl.html',

			'src/test/unit/helpers/*.js',
			'src/test/unit/init-jasmine.js',
			'src/test/unit/spec/**/*.spec.js',
			'src/test/unit/mock-data/**/*.json'
		],

		// list of files / patterns to exclude
		exclude: [],

		preprocessors: {
			'src/test/unit/mock-data/**/*.json': ['json_fixtures'],
			'src/scripts/**/*.js': ['coverage'],
			'src/scripts/**/*.tpl.html': ['ng-html2js']
		},

		ngHtml2JsPreprocessor: {
			stripPrefix: 'src/',
			moduleName: 'html2js'
		},

		jsonFixturesPreprocessor: {
			stripPrefix: 'src/test/unit/mock-data/',
			prependPrefix: '',
			variableName: '__jsonMocks__'
		},

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['progress', 'coverage', 'junit'],
		junitReporter: {
			outputDir: 'docs/reports/jasmine-unit-tests',
			outputFile: 'test-results.xml',
			suite: undefined,
			useBrowserName: false,
			nameFormatter: undefined,
			classNameFormatter: undefined
		},

		// optionally, configure the reporter
		coverageReporter: {
			dir: 'docs/reports',
			includeAllSources: true,
			instrumenterOptions: {
				istanbul: { noCompact: true }
			},
			reporters:[
				{type: 'html', subdir: 'js-coverage'},
				{type: 'cobertura', subdir: 'js-cobertura-coverage'}
			]
		},

		// web server port
		port: 8081,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		browserNoActivityTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false
	});
};
