require('jest');
require('angular');
require('angular-mocks');

// require('./wizard.js');
// require('../app.js');

describe('sum', function () {
  it('should return 1', function () {
    expect(1).toEqual(1);
  });
});

describe('wizard service', function () {
  let wizardService;
  let $q;
  let $rootScope;
  let $templateRequest;
  let $compile;
  let $controller;

  beforeEach(function () {
    angular.mock.module('wizard');

    inject(function (
      _wizardService_,
      _$q_,
      _$rootScope_,
      _$templateRequest_,
      _$compile_,
      _$controller_
    ) {
      wizardService = _wizardService_;
      $q = _$q_;
      $rootScope = _$rootScope_;
      $templateRequest = _$templateRequest_;
      $compile = _$compile_;
      $controller = _$controller_;
    });
  });

  it('should return 1', function () {
    expect(1).toEqual(1);
  });

  it('should  be defined', function () {
    expect(typeof helperService === 'object').toBe(true);
  });
});
