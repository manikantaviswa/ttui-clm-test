describe('errorMessageString', function() {
  'use strict';

  var createErrorMessageString;
  var dictionary = {
    '-1': 'There was an server error'
  };
  var ErrorsDictionary = {
    getError: function (errorCode) {
      return dictionary[errorCode] || undefined;
    }
  };

  beforeEach(angular.mock.module('TT-UI.Common.ErrorMessageString'));

  beforeEach(angular.mock.module(function($provide) {
    $provide.value('ErrorsDictionary', ErrorsDictionary);
  }));

  beforeEach(angular.mock.inject(function($injector) {
    createErrorMessageString = $injector.get('createErrorMessageString');
  }));

  it('should return error message if error string passed', function() {
    //given
    var error = '-1';
    //when
    var errorMessageString = createErrorMessageString(error);
    //then
    expect(errorMessageString).toBe('There was an server error');
  });

  it('should return error message if error object passed', function() {
    //given
    var error = {
      status: -1
    };
    //when
    var errorMessageString = createErrorMessageString(error);
    //then
    expect(errorMessageString).toBe('There was an server error');
  });

  it('should return error message if error object passed', function() {
    //given
    var error = {
      notExistingSomething: -1
    };
    //when
    var errorMessageString = createErrorMessageString(error);
    //then
    expect(errorMessageString).toBe('Unknown error');
  });

  it('should return error message if error array passed', function() {
    //given
    var error = {
      data: [
        {
          response: {
            errors: {
              error: [
                { desc: '-1' }
              ]
            }
         }
        }
      ]
    };
    //when
    var errorMessageString = createErrorMessageString(error);
    //then
    expect(errorMessageString).toBe('There was an server error');
  });
});
