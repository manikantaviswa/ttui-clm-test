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
			'dist/bower_components/jquery/dist/jquery.js',
			'dist/bower_components/angular/angular.js',
			'dist/bower_components/angular-mocks/angular-mocks.js',
			'dist/bower_components/tv4/tv4.js',
			'dist/bower_components/angular-cookies/angular-cookies.js',
			'dist/bower_components/angular-resource/angular-resource.js',
			'dist/bower_components/angular-sanitize/angular-sanitize.js',
			'dist/bower_components/angular-translate/angular-translate.js',
			'dist/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
			'dist/bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
			'dist/bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
			'dist/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
			'dist/bower_components/angular-ui-router/release/angular-ui-router.js',
			'dist/bower_components/angular-strap/dist/angular-strap.js',
			'dist/bower_components/angular-strap/dist/angular-strap.tpl.js',
			'dist/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
			'dist/bower_components/angular-animate/angular-animate.js',
			'dist/bower_components/a0-angular-storage/dist/angular-storage.js',
			'dist/bower_components/a0-angular-storage/dist/angular-storage.js',
			'dist/bower_components/angular-smart-table/dist/smart-table.js',
			'dist/bower_components/ngstorage/ngStorage.js',
			'dist/bower_components/oauth-ng/dist/oauth-ng.js',
			'dist/bower_components/objectpath/lib/ObjectPath.js',
			'dist/bower_components/angular-schema-form/dist/schema-form.js',
			'dist/bower_components/momentjs/min/moment.min.js',
			'dist/bower_components/moment-jalaali/build/moment-jalaali.js',

			'dist/scripts/ttui-common.js',
			'dist/scripts/!(**.min).js', // TODO: Change me to 'dist/scripts/**.min.js',

			'src/test/unit/helpers/*.js',
			'src/test/unit/init-jasmine.js',
			'src/test/unit/spec/**/*.spec.js',
			'src/test/unit/mock-data/**/*.json'
		],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['dots'],

		// list of files / patterns to exclude
		exclude: [],

		preprocessors: {
			'src/test/unit/mock-data/**/*.json': ['json_fixtures']
		},

		jsonFixturesPreprocessor: {
			stripPrefix: 'src/test/unit/mock-data/',
			prependPrefix: '',
			variableName: '__jsonMocks__'
		},

		// web server port
		port: 8081,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS2'],

		// custom properties for Internet Explorer
		customLaunchers:  {
			IE10: {
				base: 'IE',
				flags: ['-extoff'],
				'x-ua-compatible': 'IE=EmulateIE10'
			},
			IE11: {
				base: 'IE',
				flags: ['-extoff'],
				'x-ua-compatible': 'IE=EmulateIE11'
			}
		},

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		browserNoActivityTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true
	});
};
