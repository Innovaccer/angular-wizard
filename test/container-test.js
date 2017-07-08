require('angular');
require('angular-mocks');

require('../src/app.js');
require('../src/services/wizard.js');
require('../src/directives/container/container.js');
// require('../src/directives/conntrols/panel.js');
// require('../src/directives/steps/steps.js');
// require('../src/directives/steps/validation.js');

describe('Container Directive', function () {
  let compile;
  let rootScope;

  beforeEach(function () {
    angular.mock.module('wizard');

    inject(function ($compile, $rootScope) {
      compile = $compile;
      rootScope = $rootScope;
    });
  });

  it('should fail', function () {
    expect(2).toEqual(2);
  });

  it('should render HTML based on scope correctly', function () {
    let scope = rootScope.$new();
    let element;
    scope.steps = [{
      name: 'Profile',
      template: '<b>profile</b>',
      scope: scope
    },
    {
      name: 'Interests',
      template: '<b>interest</b>'
    },
    {
      name: 'Submit',
      template: '<h1>form-interests</h1>'
    }];

    element = compile('<form-wizard steps="steps">' +
                             '<steps></steps>' +
                             '<controls></controls>' +
                           '</form-wizard>')(scope);
    scope.$digest();

    expect(element.html()).toEqual(
    '<div class="wizard-container" ng-init="parent.init()">\n' +
    '  <div class="row">\n' +
    '    <div class="columns large-8 large-centered card">\n' +
    '      <div class="wizard-header">\n' +
    '        <div class="text-center">\n' +
    '            <b>USER REGISTRATION</b>\n' +
    '        </div>\n' +
    '        <div class="steps" ng-transclude="steps"><steps class="ng-scope"></steps></div>\n' +
    '      </div>\n' +
'\n' +
    '      <div class="wizard-body">\n' +
    '            <div id="wizard-views"><b class="ng-scope">profile</b></div>\n' +
    '      </div>\n' +
'\n' +
    '      <div class="wizard-footer">\n' +
    '        <div ng-transclude="controls"><controls class="ng-scope"></controls></div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n'
    );
  });
});
