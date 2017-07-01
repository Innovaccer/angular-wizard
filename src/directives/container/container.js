function container(wizard) {
  return {
    restrict: 'E',
    templateUrl: 'wizard-directive.html',
    scope: {
      steps: '=',
      formName: '@'
    },
    transclude: {
      steps: '?steps',
      controls: '?controlPanel'
    },
    controller: ['$element', function ($element) {
      var templateScope = null;
      /**
       * loadTemplate - load the compile template in view
       *
       * @param  {object} obj contains controller, scope information
       * @param  {number} idx index of the template to load from steps.
       */
      this.loadTemplate = function (obj, idx) {
        wizard.compileTemplate(obj).then(function (tpl) {
          var ele = angular.element($element[0].querySelector('#wizard-views'));
          var currentStepData = wizard.currentStepData();
          ele.empty();
          ele.append(tpl.template);
          // loading current step data
          if (currentStepData) {
            tpl.scope.model = currentStepData.model;
          }
          templateScope = tpl.scope;
          wizard.updateStep(idx);
        });
      };

      /**
       * saveData - saves data in factory
       */
      this.saveData = function () {
        var step = wizard.currentStep;
        if (templateScope) {
          wizard.setData(step, {
            model: templateScope.model
          });
        }
      };

      /**
       * init - initialize when components load at fist time.
       *        load first index of steps.
       */
      this.init = function () {
        var currentStep = wizard.currentStep;
        var obj = this.steps[currentStep];
        this.loadTemplate(obj, currentStep);
      };

      return this;
    }],
    controllerAs: 'parent',
    bindToController: true
  };
}

export default ['wizard', container];
