import template from './panel.html';

function panel(wizard) {
  return {
    restrict: 'E',
    require: '^formWizard',
    template: template,
    scope: {
      onCancel: '&?',
      onSubmit: '&?'
    },
    link: function (scope, elements, attrs, ctrl) {
      var stepsLength = ctrl.steps.length;
      var loadTemplate = function (index) {
        ctrl.loadTemplate(ctrl.steps[index], index);
      };

      scope.validation = wizard.getFormValidation.bind(null);

      scope.nextStep = function () {
        return wizard.currentStep === stepsLength - 1 ||
          !scope.validation();
      };

      scope.prevStep = function () {
        return wizard.currentStep === 0 || !scope.validation();
      };

      scope.control = function (action) {
        var currentStep = wizard.currentStep;

        if (action === 'prev') {
          if (currentStep > 0) {
            // Saves data
            ctrl.saveData();
            wizard.stepDecrement();
            loadTemplate(wizard.currentStep);
          }
        }

        if (action === 'next') {
          if (currentStep < stepsLength - 1) {
            // Saves data
            ctrl.saveData();
            wizard.stepIncrement();
            loadTemplate(wizard.currentStep);
          }
        }
      };
    }
  };
}

export default ['wizard', panel];
