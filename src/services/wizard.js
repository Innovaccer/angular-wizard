/**
 * WizardService
 */

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
   * setData - set data in model for that step
   *
   * @param  {number} step    step number
   * @param  {object} payload data
   * @return {object}           updated data
   */
  setData(step, payload) {
    if (this.constructor.checkStep(step) && angular.isDefined(payload)) {
      this.data[step] = payload;
      return payload;
    }
    throw new Error('req: step, payload');
  }

  /**
   * getData - get data for a step, stored in model
   *
   * @param  {number} step step number
   * @return {object}      data for that step
   */
  getData(step) {
    if (this.constructor.checkStep(step)) {
      return this.data[step];
    }
    throw new Error('req: step to be defined');
  }

  /**
   * removeData - delete data from model.
   *
   * @param  {number} step step number
   * @return {number}      step number
   */
  removeData(step) {
    if (this.constructor.checkStep(step)) {
      delete this.data[step];
      return step;
    }
    throw new Error('req: step to be defined');
  }

  /**
   * currentStepData - return current step data from model.
   *
   * @return {object} step data from model
   */
  currentStepData() {
    return this.data[this.currentStep];
  }

  /**
  * updateStep - update the current step of the wizard
  *
  * @param  {number} currentStep currentStep
  * @param  {string} action      next/prev
  * @return {number} updated step
  */
  updateStep(index) {
    if (angular.isNumber(index) && index > -1) {
      this.currentStep = index;
      return index;
    }
    throw new Error('req: number & > -1');
  }

  /**
   * stepIncrement - increment step by 1.
   *
   * @return {numer}  updated step
   */
  stepIncrement() {
    this.currentStep += 1;
    return this.currentStep;
  }

  /**
   * stepDecrement - decrement step by 1
   *
   * @return {number} updated step
   */
  stepDecrement() {
    if (this.currentStep > 0) {
      this.currentStep -= 1;
      return this.currentStep;
    }
    throw new Error('Current step should be > 0');
  }

  /**
   * formValidation - store validity for form step validity directive.
   *
   * @param  {boolean} validity validity of form of that step
   * @return {boolean} updated validity.
   */
  formValidation(validity) {
    if (validity === true || validity === false) {
      this.formValidationStatus = validity;
      return validity;
    }
    throw new Error('req: Boolean');
  }

  /**
   * getFormValidation - get form step validity.
   *
   * @return {boolean} form step validity.
   */
  getFormValidation() {
    return this.formValidationStatus;
  }
}

export default app.service('wizard', WizardService);
