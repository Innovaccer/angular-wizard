function steps(wizard) {
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
        var currentStep = wizard.currentStep;
        // check for the current index so not compile template again.
        if (idx !== currentStep) {
          ctrl.saveData();
          ctrl.loadTemplate(obj, idx);
        }
      };
    }
  };
}

export default ['wizard', steps];
