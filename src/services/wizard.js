function wizard($q, $rootScope, $templateRequest, $compile, $controller) {
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

  var self = this;

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
      // Inject controller
      if (obj.controller) {
        $controller(obj.controller, {
          $scope: scope
        });
      }
      deferred.resolve({
        template: templateElement,
        scope: scope
      });
    }).catch(function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };

  /**
   * Wizard form data
   */
  this.data = {};

  this.setData = function (step, payload) {
    this.data[step] = payload;
  };

  this.getData = function () {
    return this.data;
  };

  this.removeData = function (step) {
    delete this.data[step];
  };

  this.currentStepData = function () {
    return this.data[this.currentStep];
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

  /**
   * Form validations
   */
  this.formValidationStatus = true;
  this.formValidation = function (validity) {
    self.formValidationStatus = validity;
  };

  this.getFormValidation = function () {
    return self.formValidationStatus;
  };
}

export default ['$q', '$rootScope', '$templateRequest', '$compile',
  '$controller', wizard];
