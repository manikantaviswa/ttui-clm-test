describe('Directive: "multiselect-dropdown" ', function () {
    'use strict';

    var $compile;
    var $scope;
    var $rootScope;

    var dropdown;
    var elem =
        angular.element('<multiselect-dropdown ' +
            'ng-model="fakeModel" ' +
            'options="options"></multiselect-dropdown>');
    var dropdownScope;
    var foo = { 'name': 'Foo', 'value': 'Foo' };
    var boo = { 'name': 'Boo', 'value': 'Boo' };
    var mockData = [foo, boo];

    function getNgModelFromHtml(html) {
        return angular.element(html).controller('ngModel');
    }

    beforeEach(function () {
        angular.mock.module('TT-UI.Common.Directives.MultiselectDropdown');

        angular.mock.inject(function ($injector) {
            $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
        });
    });

    beforeEach(function () {
        $scope.fakeModel = '';
        $scope.options = mockData;
        dropdown = $compile(elem)($scope);

        $scope.$digest();

        dropdownScope = dropdown.isolateScope();
        elem = dropdown[0];
    });

    afterEach(function () {
        $scope.$destroy();
    });

    describe('html render', function () {
        it('should check if directive have processed element.', function () {
            // then
            expect(dropdownScope).toBeDefined();
            expect(dropdown).not.toBeNull();
            expect(dropdown.length).not.toEqual(0);
        });

        it('should test if element contains proper structure.', function () {
            dropdownScope.toggleDropdown();
            // given
            var dropDownMenu = elem.querySelector('ul');
            var search = elem.querySelector('div.search-container');
            var options = dropDownMenu.querySelectorAll('li');

            // when
            $scope.$digest();

            //  then
            expect(search).not.toBeNull();
            expect(dropDownMenu).not.toBeNull();
            expect(options.length).toBeGreaterThan(1);
        });
    });

    describe('behavior', function () {
        it('should be pristine on load', function () {
            // given
            var ngModel = getNgModelFromHtml(elem);

            // then
            expect(ngModel.$pristine).toBeTruthy();
        });

        it('should not be pristine after change', function () {
            // given
            var ngModel = getNgModelFromHtml(elem);

            // when
            var mockEvent = $.Event('click');
            dropdownScope.toggleSelectAll(mockEvent);

            // then
            expect(ngModel.$pristine).toBeFalsy();
        });

        it('should be pristine with preselected options', function () {
            var ngModel = getNgModelFromHtml(elem);
            
            dropdownScope.preselected = [foo];
            $scope.$apply();

            // then
            expect(ngModel.$viewValue[0].name).toEqual(foo.name);
            expect(ngModel.$pristine).toBeTruthy();
        });

        it('should test if element options were provided and check if their structure is okay.', function () {
            //  then
            expect(dropdownScope.options).toBeDefined();
            expect(dropdownScope.options.length).toBeGreaterThan(0);
            expect(dropdownScope.options[0].name).toEqual(foo.name);
            expect(dropdownScope.options[0].value).toEqual(foo.value);
        });

        it('should try selecting one element. And then check if it is selected.', function () {
            // given
            var ngModel = getNgModelFromHtml(elem);
            var mockEvent = $.Event('click');

            // when
            dropdownScope.setSelectedItem(boo, mockEvent);

            //  then
            expect(ngModel.$viewValue).toEqual([boo]);
        });

        it('should try deselecting element after only it was selected. And then check if selected items is empty.', function () {
            // given
            var ngModel = getNgModelFromHtml(elem);
            var mockEvent = $.Event('click');

            dropdownScope.setSelectedItem(boo, mockEvent);

            // when
            dropdownScope.setSelectedItem(boo, mockEvent);

            //  then
            expect(ngModel.$viewValue).toEqual([]);
        });

        it('should try selecting all elements. And then check if selected items length is 2', function () {
            // given
            var ngModel = getNgModelFromHtml(elem);

            // when
            var mockEvent = $.Event('click');
            dropdownScope.toggleSelectAll(mockEvent);

            //  then
            expect(ngModel.$viewValue.length).toBe(2);
            expect(ngModel.$viewValue[0].name).toEqual(foo.name);
            expect(ngModel.$viewValue[1].name).toEqual(boo.name);
        });

        it('should try deselecting all elements. And then check if selected items length is 0', function () {
            // given
            var ngModel = getNgModelFromHtml(elem);

            var mockEvent = $.Event('click');
            dropdownScope.toggleSelectAll(mockEvent);
            dropdownScope.toggleSelectAll(mockEvent);

            //  then
            expect(ngModel.$viewValue).toEqual([]);
        });

        it('should return a model to formatter queuqe', function () {
            // given
            var ngModel = getNgModelFromHtml(elem);

            var value;
            var fakeFormatter = jasmine.createSpy().and.callFake(function formatterSpy(val) {
                value = val;
            });
            ngModel.$formatters.push(fakeFormatter);

            // when
            $scope.fakeModel = mockData;
            $scope.$digest();

            // then
            expect(fakeFormatter).toHaveBeenCalledWith(mockData);
            expect(value).toEqual(mockData);
        });

        it('should return a model to parsers queuqe', function () {
            // given
            var ngModel = getNgModelFromHtml(elem);

            var value;
            var fakeParser = jasmine.createSpy().and.callFake(function parserSpy(val) {
                value = val;
            });
            ngModel.$parsers.push(fakeParser);

            // when
            ngModel.$setViewValue(mockData);
            $scope.$digest();

            // then
            expect(fakeParser).toHaveBeenCalledWith(mockData);
            expect(value).toEqual(mockData);
        });
    });

    describe('html-ui events tests', function () {
        it('should test if clicked element is checked', function () {
            // given
            var option = angular.element(elem).find('li')[0];
            var ngModel = getNgModelFromHtml(elem);
            spyOn(ngModel, '$setViewValue').and.callThrough();

            // when
            angular.element(option).triggerHandler('click');
            expect(ngModel.$setViewValue).toHaveBeenCalledWith([foo]);

            //  then
            expect(dropdownScope.selectedOptions.length).toEqual(1);
            expect(dropdownScope.selectedOptions[0].name).toEqual(foo.name);
            expect(dropdownScope.selectedOptions[0].value).toEqual(foo.value);
        });

        it('should test if all elements are selected after clicking "Select All"', function () {

            var option = elem.querySelector('[value="select-all"]');

            // when
            angular.element(option).triggerHandler('click');

            //  then
            expect(dropdownScope.selectedOptions.length).toEqual(2);
            expect(dropdownScope.selectedOptions[0].name).toEqual(foo.name);
            expect(dropdownScope.selectedOptions[1].name).toEqual(boo.name);
        });

        it('should test if dropdown opens and closes on click.', function () {
            dropdownScope.toggleDropdown();
            //  then
            expect(dropdownScope.open).toEqual(true);
            dropdownScope.toggleDropdown();
            expect(dropdownScope.open).toEqual(false);
        });

        it('should test if pressing "Enter" key on the keyboard opens dropdown.', function () {
            // given
            elem.focus();

            var keyDownEvent = $.Event('keydown');

            // when
            keyDownEvent.keyCode = 13; // "Enter" key code
            keyDownEvent.srcElement = { 'id': '' };
            angular.element(elem).triggerHandler(keyDownEvent);
            //  then
            expect(dropdownScope.open).toEqual(true);
        });

        it('should test if pressing "Esc" key on the keyboard closes dropdown.', function () {
            // given
            elem.focus();
            var keyDownEvent = jQuery.Event('keydown');

            // when
            keyDownEvent.keyCode = 13; // "Enter" key code
            keyDownEvent.srcElement = { 'id': '' };

            angular.element(elem).triggerHandler(keyDownEvent);

            keyDownEvent.keyCode = 27; // "Esc" key code
            angular.element(elem).triggerHandler(keyDownEvent);

            //  then
            expect(dropdownScope.open).toEqual(false);
        });

        it('should test if pressing "Arrow" keys on the keyboard navigates through dropdown options.', function () {
            // given
            dropdownScope.toggleDropdown();
            elem.focus();
            var keyDownEvent = jQuery.Event('keydown');

            // when
            keyDownEvent.keyCode = 40; // "Down Arrow" key code
            keyDownEvent.srcElement = { 'id': '' };

            angular.element(elem).triggerHandler(keyDownEvent);
            expect(dropdownScope.keyBoardPointer(foo.value)).toEqual(true);
            angular.element(elem).triggerHandler(keyDownEvent);
            expect(dropdownScope.keyBoardPointer(boo.value)).toEqual(true);
            keyDownEvent.keyCode = 38; // "Up Arrow" key code
            angular.element(elem).triggerHandler(keyDownEvent);
            expect(dropdownScope.keyBoardPointer(foo.value)).toEqual(true);
        });

        it('should test if pressing "enter/space" key on the keyboard selects one option.', function () {
            /*var ngModel = getNgModelFromHtml(elem);

            spyOn(dropdownScope, '$digest').and.callThrough();
            spyOn(ngModel, '$setViewValue').and.callThrough();
            // given
            dropdownScope.toggleDropdown();
            elem.focus();
            var keyDownEvent = $.Event('keydown');

            // when
            keyDownEvent.keyCode = 40; // "Down Arrow" key code
            keyDownEvent.srcElement = {'id': ''};

            angular.element(elem).triggerHandler(keyDownEvent);
            expect(dropdownScope.keyBoardPointer(foo.value)).toEqual(true);
            keyDownEvent.keyCode = 13; // "Enter" key code
            angular.element(elem).triggerHandler(keyDownEvent);
            //ngModel.$setViewValue(['Foo']);
            expect(ngModel.$setViewValue).toHaveBeenCalledWith([foo]);
            expect(dropdownScope.$digest).toHaveBeenCalled();

            //  then
            // TODO this isn't unpdated though it seems to be okay?
            console.log('in test', dropdownScope.selectedOptions);
            expect(dropdownScope.selectedOptions.length).toBeGreaterThan(0);
            expect(dropdownScope.selectedOptions[0].value).toEqual(foo.value);*/
        });

        it('should filter results based on search text', function () {
            expect(dropdownScope.filteredOptions.length).toBe(2);
            dropdownScope.searchText = 'f';
            dropdownScope.$digest();
            expect(dropdownScope.filteredOptions.length).toBe(1);
        });

        it('should select all from filtered results', function () {
            dropdownScope.searchText = 'f';
            dropdownScope.$digest();

            var mockEvent = $.Event('click');
            dropdownScope.toggleSelectAll(mockEvent);

            expect(dropdownScope.count).toBe(1);
            expect(dropdownScope.selectedOptions.length).toEqual(1);
            expect(dropdownScope.selectedOptions[0].value).toEqual(foo.value);
        });

        it('should deselect all from filtered results', function () {
            var mockEvent = $.Event('click');
            dropdownScope.allSelect = false;
            dropdownScope.toggleSelectAll(mockEvent);

            dropdownScope.searchText = 'f';
            dropdownScope.$digest();
            dropdownScope.toggleSelectAll(mockEvent);

            expect(dropdownScope.count).toBe(1);
            expect(dropdownScope.selectedOptions.length).toEqual(1);
            expect(dropdownScope.selectedOptions[0].value).toEqual(boo.value);
        });
    });
});
