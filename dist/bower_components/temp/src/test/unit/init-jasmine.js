'use strict';

beforeEach(function() {

	// Dissable bootstraping application
	spyOn(angular, 'bootstrap');

	try {
		angular.module('html2js');
		angular.mock.module('html2js');
	}
	catch (er) {}

	var modules = [
		'TT-UI.WizardManager.Tpl',
		'TT-UI.Auth.Tpl',
		'TT-UI.Common.Tpl',
		'TT-UI.HierarchyTree.Tpl',
		'TT-UI.MultiselectHierarchyTree.Tpl'
	];

	try {
		modules.forEach(function(module) {
			angular.module(module);
			angular.mock.module(module);
		});
	}
	catch (err) {}

	function isIE () {
		var myNav = navigator.userAgent.toLowerCase();
		return (myNav.indexOf('msie') !== -1 || myNav.indexOf('rv:11.0') !== -1);
	}

	function provideTranslateIEFixture($provide) {
		$provide.factory('$translateLocalStorage', function() {
			return {
				get: function() {
						return 'en';
				},
				put: function() {},
				set: function() {}
			};
		});
	}

	angular.mock.module('pascalprecht.translate', function($provide) {
		if(isIE()){
			provideTranslateIEFixture($provide);
		}
	});

	angular.mock.module(function($translateProvider) {
		spyOn($translateProvider, 'useStaticFilesLoader');
		spyOn($translateProvider, 'determinePreferredLanguage').and.returnValue('en');

		$translateProvider.translations('en', {
			'currencySymbols': {
				'EUR': '€'
			}
		});
		$translateProvider.preferredLanguage('en');
		$translateProvider.use('en');
	});
});
