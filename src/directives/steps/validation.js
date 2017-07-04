function validation(wizard) {
  return {
    restrict: 'A',
    require: '^form',
    link: function (scope, element, attrs, formCtrl) {
      // Watch the form validity
      scope.$watch(function () {
        wizard.formValidation.call(null, formCtrl.$valid);
      });
    }
  };
}

export default ['wizard', validation];
