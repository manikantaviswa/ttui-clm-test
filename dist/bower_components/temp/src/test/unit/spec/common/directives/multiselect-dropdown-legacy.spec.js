describe('Directive: "multiselect-dropdown" ', function() {
	'use strict';

	var $compile;
	var $scope;
	var $rootScope;

	function getNgModelFromHtml(html) {
		return angular.element(html).controller('ngModel');
	}

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.MultiselectDropdownLegacy');

		angular.mock.inject(function($injector){
			$compile = $injector.get('$compile');
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
		});
	});

	afterEach(function() {
		$scope.$destroy();
	});

	var options = [
		{
			name: 'FooName',
			value: 'FooValue'
		},
		{
			name: 'BooName',
			value: 'BooValue'
		}
	];

	function constructOptionsString(options){
		var result = '';

		options.forEach(function(option, i){
			result += '{\'name\':' + '\'' + option.name + '\', \'value\':' + '\'' + option.value + '\'}' + (i < options.length - 1 ? ',' : '');
		});

		return result;
	}

	function getAllOptionsValues(options){
		return options.map(function(option){
			return option.value;
		});
	}

	function expectEmptyModel(scope, ngModel){
		expect(scope.model.length).toEqual(0);
		expect(ngModel.$viewValue.length).toEqual(0);
	}

	var tpl =
		'<multiselect-dropdown-legacy ' +
			'ng-model="fakeModel" ' +
			'options="[' + constructOptionsString(options) + ']"' +
		'></multiselect-dropdown-legacy>';

	describe('html render', function() {
		it('should test if element contains proper structure.', function() {
			// given
			var html = $compile(tpl)($scope)[0];
			var description = html.querySelector('div');
			var dropDownMenu = html.querySelector('ul');
			var options = dropDownMenu.querySelectorAll('[data-role="option"]');

			// when
			$scope.$digest();

			//  then
			expect(html.classList).toContain('ui-multiselect-dropdown');
			expect(description.classList).toContain('ui-multiselect-dropdown-description');
			expect(dropDownMenu.classList).toContain('dropdown-menu');
			expect(options.length).toBeGreaterThan(1);
		});
	});

	describe('behavior', function() {
		it('should be pristine with preselected options', function(){
			var tplWithPreselected =
			'<multiselect-dropdown ' +
				'ng-model="fakeModel" ' +
				'preselected="[\'FooValue\',\'BooValue\']"' +
				'options="[{\'name\':\'FooName\', \'value\':\'FooValue\'},' +
					'{\'name\':\'BooName\', \'value\':\'BooValue\'}]"' +
			'></multiselect-dropdown>';

			var html = $compile(tplWithPreselected)($scope);
			var ngModel = getNgModelFromHtml(html);

			// then
			expect(ngModel.$pristine).toBeTruthy();
		});

		describe('no preselected options', function(){
			var html, scope, ngModel;

			beforeEach(function(){
				html = $compile(tpl)($scope);
				scope = $scope.$$childTail;
				ngModel = getNgModelFromHtml(html);
			});

			it('should not be pristine after change', function(){
				// when
				scope.selectAll();

				// then
				expect(ngModel.$pristine).toBeFalsy();
			});

			it('should be pristine on load', function(){
				expect(ngModel.$pristine).toBeTruthy();
			});

			it('should test if element options were provided', function(){
				expect(scope.options.length).not.toBe(0);
				options.forEach(function(_, i){
					expect(options[i].name).toEqual(scope.options[i].name);
					expect(options[i].value).toEqual(scope.options[i].value);
				});
			});

			it('should try selecting one element. And then check if it is selected.', function(){
				// given
				var selectedItem = options[0];

				// when
				scope.setSelectedItem(selectedItem);

				//  then
				expect(scope.model).toEqual([selectedItem.value]);
				expect(ngModel.$viewValue).toEqual([selectedItem.value]);
			});

			it('should try deselecting element after only it was selected. And then check if scope.model is empty.', function(){
				// given
				var selectedItem = options[0];

				// when
				scope.setSelectedItem(selectedItem); // two times to unselect it
				scope.setSelectedItem(selectedItem);

				//  then
				expectEmptyModel(scope, ngModel);
			});

			it('should try selecting all elements. And then check if scope.model length is 2', function(){
				// given
				var expectedModelvalue = getAllOptionsValues(options);

				// when
				scope.selectAll();

				//  then
				expect(scope.model).toEqual(expectedModelvalue);
				expect(ngModel.$viewValue).toEqual(expectedModelvalue);
			});

			it('should try deselecting all elements. And then check if scope.model length is 0', function(){
				// when
				scope.selectAll();
				scope.deselectAll();

				// then
				expectEmptyModel(scope, ngModel);
			});

			it('should return a model to formatter queuqe', function() {
				// given
				var value;
				var fakeFormatter = jasmine.createSpy().and.callFake(function formatterSpy(val) {
					value = val;
				});
				ngModel.$formatters.push(fakeFormatter);

				// when
				$scope.fakeModel = ['Foo', 'Var'];
				$scope.$digest();

				// then
				expect(fakeFormatter).toHaveBeenCalledWith(['Foo', 'Var']);
				expect(value).toEqual(['Foo', 'Var']);
			});

			it('should return a model to parsers queuqe', function() {
				// given

				var value;
				var fakeParser = jasmine.createSpy().and.callFake(function parserSpy(val) {
					value = val;
				});
				ngModel.$parsers.push(fakeParser);

				// when
				ngModel.$setViewValue(['Foo', 'Var']);
				$scope.$digest();

				// then
				expect(fakeParser).toHaveBeenCalledWith(['Foo', 'Var']);
				expect(value).toEqual(['Foo', 'Var']);
			});
		});
	});

	describe('html-ui events tests', function() {
		var html, scope, keyDownEvent;

		beforeEach(function(){
			html = $compile(tpl)($scope);
			scope = $scope.$$childTail;
			$scope.$digest();
			keyDownEvent = jQuery.Event('keydown');
		});

		it('should test if clicked element is checked', function(){
			// given
			var option = html.find('li')[3]; // first two <li> are not options
			var selectedValue = options[0].value;

			// when
			angular.element(option).triggerHandler('click');

			//  then
			expect(scope.model).toEqual([selectedValue]);
		});

		it('should test if all elements are selected after clicking "Check All"', function(){
			// given
			var option = html[0].querySelector('[data-value="select-all"]');

			// when
			angular.element(option).triggerHandler('click');

			//  then
			expect(scope.model).toEqual(getAllOptionsValues(options));
		});

		it('should test if dropdown opens on click.', function(){
			// when
			$(html).click();

			//  then
			expect(scope.open).toEqual(true);
		});

		it('should test if dropdown closes on second click.', function(){
			// when
			$(html).click();
			$(html).click();

			//  then
			expect(scope.open).toEqual(false);
		});

		it('should test if pressing "Enter" key on the keyboard opens dropdown.', function(){
			// when
			keyDownEvent.keyCode = 13; // "Enter" key code
			$(html).trigger(keyDownEvent);

			//  then
			expect(scope.open).toEqual(true);
		});

		it('should test if pressing "Esc" key on the keyboard closes dropdown.', function(){
			// when
			keyDownEvent.keyCode = 13; // "Enter" key code
			$(html).trigger(keyDownEvent);
			keyDownEvent.keyCode = 27; // "Esc" key code
			$(html).trigger(keyDownEvent);

			//  then
			expect(scope.open).toEqual(false);
		});

		it('should test if pressing "Arrow" keys on the keyboard navigates through dropdown options.', function(){
			// when
			keyDownEvent.keyCode = 40; // "Down Arrow" key code
			$(html).trigger(keyDownEvent);
			keyDownEvent.keyCode = 38; // "Up Arrow" key code
			$(html).trigger(keyDownEvent);

			//  then
			expect(scope.keyBoardPointer('BooValue')).toEqual(true);
		});

		it('should test if pressing "Space" key on the keyboard selects one option.', function(){
			// when
			keyDownEvent.keyCode = 40; // "Down Arrow" key code
			$(html).trigger(keyDownEvent);
			keyDownEvent.keyCode = 32; // "Space" key code
			$(html).trigger(keyDownEvent);

			//  then
			expect(scope.model.length).toBeGreaterThan(0);
			expect(scope.model[0]).toEqual('FooValue');
		});
	});
});
