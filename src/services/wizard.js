import app from '../app.js';


class WizardService {
  constructor($q, $rootScope, $templateRequest, $compile, $controller) {
    'ngInject';

    // Angular Dependencies
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.$templateRequest = $templateRequest;
    this.$compile = $compile;
    this.$controller = $controller;

    // Service Dependencies
    this.data = {};
    this.currentStep = 0;
    this.formValidationStatus = true;
  }

  /**
   * @static checkStep - validate step as an integer
   *
   * @param  {type} step input step to validate
   * @return {boolean}   true/false
   */
  static checkStep(step) {
    return angular.isNumber(step) && step > -1;
  }

  /**
   * getTemplate - Get template
   *
   * @param  {string} template
   * @param  {string} templateUrl
   * @return {promise}
   */
  getTemplate(template, templateUrl) {
    const deferred = this.$q.defer();
    if (template) {
      deferred.resolve(template);
    } else if (templateUrl) {
      this.$templateRequest(templateUrl)
        .then(function (tpl) {
          deferred.resolve(tpl);
        }, function (error) {
          deferred.reject(error);
        });
    } else {
      deferred.reject('No template or templateUrl has been specified.');
    }
    return deferred.promise;
  }

  /**
   * compileTemplate - compile template with controller and scope
   *
   * @param  {object} options contains controller, scope and template
   * @return {promise} templateElement  compiled template event
   */
  compileTemplate(obj) {
    const deferred = this.$q.defer();
    const self = this;
    this.getTemplate(obj.template, obj.templateUrl).then(function (template) {
      var scope = (obj.scope || self.$rootScope).$new();
      var templateElement = self.$compile(template)(scope);
      // inject controller
      if (obj.controller) {
        self.$controller(obj.controller, {
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
  }


  /**
   * setData - description
   *
   * @param  {type} step    description
   * @param  {type} payload description
   * @return {type}         description
   */
  setData(step, payload) {
    if (this.constructor.checkStep(step) && angular.isDefined(payload)) {
      this.data[step] = payload;
      return payload;
    }
    throw new Error('req: step, payload');
  }

  /**
   * getData - description
   *
   * @param  {type} step description
   * @return {type}      description
   */
  getData(step) {
    if (this.constructor.checkStep(step)) {
      return this.data[step];
    }
    throw new Error('req: step to be defined');
  }

  /**
   * removeData - description
   *
   * @param  {type} step description
   * @return {type}      description
   */
  removeData(step) {
    if (this.constructor.checkStep(step)) {
      delete this.data[step];
      return step;
    }
    throw new Error('req: step to be defined');
  }

  /**
   * currentStepData - description
   *
   * @return {type}  description
   */
  currentStepData() {
    return this.data[this.currentStep];
  }

  /**
  * updateStep - update the current step of the wizard
  *
  * @param  {number} currentStep currentStep
  * @param  {string} action      next/prev
  */
  updateStep(index) {
    if (angular.isNumber(index) && index > -1) {
      this.currentStep = index;
      return index;
    }
    throw new Error('req: number & > -1');
  }

  /**
   * stepIncrement - description
   *
   * @return {type}  description
   */
  stepIncrement() {
    this.currentStep += 1;
    return this.currentStep;
  }

  /**
   * stepDecrement - description
   *
   * @return {type}  description
   */
  stepDecrement() {
    if (this.currentStep > 0) {
      this.currentStep -= 1;
      return this.currentStep;
    }
    throw new Error('Current step should be > 0');
  }

  /**
   * formValidation - description
   *
   * @param  {type} validity description
   * @return {type}          description
   */
  formValidation(validity) {
    if (validity === true || validity === false) {
      this.formValidationStatus = validity;
      return validity;
    }
    throw new Error('req: Boolean');
  }

  /**
   * getFormValidation - description
   *
   * @return {type}  description
   */
  getFormValidation() {
    return this.formValidationStatus;
  }
}

// function wizardService($q, $rootScope, $templateRequest, $compile, $controller) {
//   /**
//    * getTemplate - Get template
//    *
//    * @param  {string} template
//    * @param  {string} templateUrl
//    * @return {promise}
//    */
//   var getTemplate = function (template, templateUrl) {
//     var deferred = $q.defer();
//     if (template) {
//       deferred.resolve(template);
//     } else if (templateUrl) {
//       $templateRequest(templateUrl)
//         .then(function (tpl) {
//           deferred.resolve(tpl);
//         }, function (error) {
//           deferred.reject(error);
//         });
//     } else {
//       deferred.reject('No template or templateUrl has been specified.');
//     }
//     return deferred.promise;
//   };
//
//   var checkStep = function (step) {
//     return angular.isNumber(step) && step > -1;
//   };
//
//   var self = this;
//
//   /**
//    * compileTemplate - compile template with controller and scope
//    *
//    * @param  {object} options contains controller, scope and template
//    * @return {promise} templateElement  compiled template event
//    */
//   this.compileTemplate = function (obj) {
//     var deferred = $q.defer();
//     getTemplate(obj.template, obj.templateUrl).then(function (template) {
//       var scope = (obj.scope || $rootScope).$new();
//       var templateElement = $compile(template)(scope);
//       // Inject controller
//       if (obj.controller) {
//         $controller(obj.controller, {
//           $scope: scope
//         });
//       }
//       deferred.resolve({
//         template: templateElement,
//         scope: scope
//       });
//     }).catch(function (error) {
//       deferred.reject(error);
//     });
//
//     return deferred.promise;
//   };
//
//   /**
//    * Wizard form data
//    */
//   this.data = {};
//
//   this.setData = function (step, payload) {
//     if (checkStep(step) && angular.isDefined(payload)) {
//       this.data[step] = payload;
//       return payload;
//     }
//     throw new Error('req: step, payload');
//   };
//
//   this.getData = function (step) {
//     if (checkStep(step)) {
//       return this.data[step];
//     }
//     throw new Error('req: step to be defined');
//   };
//
//   this.removeData = function (step) {
//     if (checkStep(step)) {
//       delete this.data[step];
//       return step;
//     }
//     throw new Error('req: step to be defined');
//   };
//
//   this.currentStepData = function () {
//     return this.data[this.currentStep];
//   };
//
//
//   /**
//    * Wizard form data in steps.
//    */
//   this.currentStep = 0; // intializes it with first step.
//
//   /**
//   * updateStep - update the current step of the wizard
//   *
//   * @param  {number} currentStep currentStep
//   * @param  {string} action      next/prev
//   */
//   this.updateStep = function (index) {
//     if (angular.isNumber(index) && index > -1) {
//       this.currentStep = index;
//       return index;
//     }
//     throw new Error('req: number & > -1');
//   };
//
//   this.stepIncrement = function () {
//     this.currentStep += 1;
//     return this.currentStep;
//   };
//
//   this.stepDecrement = function () {
//     if (this.currentStep > 0) {
//       this.currentStep -= 1;
//       return this.currentStep;
//     }
//     throw new Error('Current step should be > 0');
//   };
//
//   /**
//    * Form validations
//    */
//   this.formValidationStatus = true;
//   this.formValidation = function (validity) {
//     if (validity === true || validity === false) {
//       self.formValidationStatus = validity;
//       return validity;
//     }
//     throw new Error('req: Boolean');
//   };
//
//   this.getFormValidation = function () {
//     return self.formValidationStatus;
//   };
// }
//
export default app.service('wizard', WizardService);
