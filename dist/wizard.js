/**
 * Datashop Notification - Notificaion Service for Datashop.
 * @author Ayush Sharma
 * @version v0.0.1
 * @link 
 * @license MIT
 */
angular.module('wizard', [])

.service('wizardService', ["$q", "$rootScope", "$templateRequest", "$compile", "$controller", function ($q, $rootScope, $templateRequest, $compile,
  $controller) {
  /**
   * getTemplate - Get template
   *
   * @param  {string} template
   * @param  {string} templateUrl
   * @return {promise}
   */
  var getTemplate = function (template, templateUrl) {
    var deferred = $q.defer();
    if (template) {
      deferred.resolve(template);
    } else if (templateUrl) {
      $templateRequest(templateUrl)
        .then(function (tpl) {
          deferred.resolve(tpl);
        }, function (error) {
          deferred.reject(error);
        });
    } else {
      deferred.reject('No template or templateUrl has been specified.');
    }
    return deferred.promise;
  };

  /**
   * compileTemplate - compile template with controller and scope
   *
   * @param  {object} options contains controller, scope and template
   * @return {promise} templateElement  compiled template event
   */
  this.compileTemplate = function (obj) {
    var deferred = $q.defer();
    getTemplate(obj.template, obj.templateUrl).then(function (template) {
      var scope = (obj.scope || $rootScope).$new();
      var templateElement = $compile(template)(scope);
      $controller(obj.controller, {
        $scope: scope
      });
      deferred.resolve(templateElement);
    }).catch(function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };

  /**
   * Wizard form data in steps.
   */
  this.wizardData = {};

  this.setWizardData = function (step, payload) {
    this.wizardData[step] = payload;
  };

  this.removeWizardData = function (step) {
    delete this.wizardData[step];
  };

  /**
   * Wizard form data in steps.
   */
  this.currentStep = 0; // intializes it with first step.

  /**
  * updateStep - update the current step of the wizard
  *
  * @param  {number} currentStep currentStep
  * @param  {string} action      next/prev
  */
  this.updateStep = function (index) {
    this.currentStep = index;
  };

  this.stepIncrement = function () {
    this.currentStep += 1;
  };

  this.stepDecrement = function () {
    this.currentStep -= 1;
  };
}])

.directive('formWizard', ["wizardService", function (wizardService) {
  return {
    restrict: 'E',
    templateUrl: 'wizard-directive.html',
    scope: {
      steps: '='
    },
    transclude: {
      steps: 'steps',
      controls: 'controlPanel'
    },
    controller: ['$scope', '$element', function ($scope, $element) {
      /**
       * loadTemplate - load the compile template in view
       *
       * @param  {object} obj contains controller, scope information
       * @param  {number} idx index of the template to load from steps.
       */
      $scope.loadTemplate = function (obj, idx) {
        wizardService.compileTemplate(obj).then(function (tpl) {
          var elem = angular.element($element[0].querySelector('#form-views'));
          elem.empty();
          elem.append(tpl);
          wizardService.updateStep(idx);
        });
      };


      /**
       * init - initialize when components load at fist time.
       *        load first index of steps.
       */
      $scope.init = function () {
        var currentStep = wizardService.currentStep;
        var obj = $scope.steps[currentStep];
        $scope.loadTemplate(obj, currentStep);
      };

      return $scope;
    }]
  };
}])

.directive('steps', ["wizardService", function (wizardService) {
  return {
    restrict: 'E',
    require: '^formWizard',
    templateUrl: 'steps.html',
    link: function (scope, element, attrs, ctrl) {
      /**
       * loadTemplate- wrapper for loadTemplate in parent controller
       *
       * @param  {object} obj description
       * @param  {number} idx description
       */
      scope.loadTemplate = function (obj, idx) {
        var currentStep = wizardService.currentStep;
        // check for the current index so not compile template again.
        if (idx !== currentStep) {
          ctrl.loadTemplate(obj, idx);
        }
      };
    }
  };
}])

.directive('controlPanel', ["wizardService", function (wizardService) {
  return {
    restrict: 'E',
    require: '^formWizard',
    templateUrl: 'control-panel.html',
    link: function (scope, elements, attrs, ctrl) {
      var stepsLength = ctrl.steps.length;
      var loadTemplate = function (index) {
        ctrl.loadTemplate(ctrl.steps[index], index);
      };

      scope.currentIndex = function () {
        return wizardService.currentStep;
      };

      scope.control = function (action) {
        var currentStep = wizardService.currentStep;

        if (action === 'prev') {
          if (currentStep > 0) {
            wizardService.stepDecrement();
            loadTemplate(wizardService.currentStep);
          }
        }

        if (action === 'next') {
          if (currentStep < stepsLength - 1) {
            wizardService.stepIncrement();
            loadTemplate(wizardService.currentStep);
          }
        }

        scope.currentIndex();
      };
    }
  };
}]);

angular.module("wizard").run(["$templateCache", function($templateCache) {$templateCache.put("control-panel.html","<div class=\"col-xs-6 col-xs-offset-3\"><a ui-sref=\"form.interests\" class=\"btn btn-block btn-info\" ng-click=\"control(\'next\')\">Next Section {{currentIndex()}} <span class=\"glyphicon glyphicon-circle-arrow-right\"></span></a></div><div class=\"col-xs-6 col-xs-offset-3\"><a ui-sref=\"form.interests\" class=\"btn btn-block btn-info\" ng-click=\"control(\'prev\')\">Prev Section {{currentIndex()}} <span class=\"glyphicon glyphicon-circle-arrow-right\"></span></a></div>");
$templateCache.put("steps.html","<div id=\"status-buttons\" class=\"text-center\"><button ng-repeat=\"step in steps\" ng-click=\"loadTemplate(step, $index)\"><span>{{$index}}</span> {{step.name}}</button></div>");
$templateCache.put("wizard-directive.html","<div id=\"form-container\" ng-init=\"init()\"><div class=\"page-header text-center\"><h2>Let\'s Make a Wizard</h2><div ng-transclude=\"steps\"></div></div><form id=\"signup-form\" ng-submit=\"processForm()\"><div id=\"form-views\"></div></form><div ng-transclude=\"controls\"></div></div>");}]);