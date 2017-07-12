require('angular');
require('angular-mocks');

require('../src/app.js');
require('../src/services/wizard.js');

describe('wizard service', function () {
  let wizard;

  beforeEach(function () {
    angular.mock.module('wizard');

    inject(function (_wizard_) {
      wizard = _wizard_;
    });
  });

  it('Wizard: should be defined and contains methods', function () {
    expect(wizard).toBeDefined();
    // Wizard service contains 8 methods
    expect(Object.keys(wizard).length).toEqual(8);
    expect(wizard.currentStep).toEqual(0);
  });

  xit('should return promise on compile template', function () {
    // expect('')
  });

  it('data should be equals to an blank object', function () {
    expect(wizard.data).toEqual({});
  });

  it('setData: should throw an error', function () {
    expect(function () {
      wizard.setData();
    }).toThrow(new Error('req: step, payload'));
    expect(function () {
      wizard.setData(-1);
    }).toThrow(new Error('req: step, payload'));
    expect(function () {
      wizard.setData(null);
    }).toThrow(new Error('req: step, payload'));
    expect(wizard.setData(2, null)).toEqual(null);
  });

  it('setData: should set data', function () {
    expect(wizard.setData(0, 'I am at 0')).toEqual('I am at 0');
  });

  it('getData: should throw an error', function () {
    expect(function () {
      wizard.getData();
    }).toThrow(new Error('req: step to be defined'));
    expect(function () {
      wizard.getData(-1);
    }).toThrow(new Error('req: step to be defined'));
    expect(function () {
      wizard.getData(null);
    }).toThrow(new Error('req: step to be defined'));
    expect(wizard.getData(2)).toBeUndefined();
  });

  it('getData: should get data', function () {
    wizard.setData(0, 'I am at 0');
    wizard.setData(1, 'I am at 1');
    expect(wizard.getData(0)).toEqual('I am at 0');
    expect(wizard.getData(1)).toEqual('I am at 1');
  });

  it('currentStep: data', function () {
    expect(wizard.currentStepData()).toBeUndefined();
    expect(wizard.setData(wizard.currentStep, 'I am at at currentStep'))
      .toEqual('I am at at currentStep');
    expect(wizard.currentStepData()).toEqual('I am at at currentStep');
  });

  it('removeData: should throw an error', function () {
    expect(function () {
      wizard.removeData();
    }).toThrow(new Error('req: step to be defined'));
    expect(function () {
      wizard.removeData(-1);
    }).toThrow(new Error('req: step to be defined'));
    expect(function () {
      wizard.removeData(null);
    }).toThrow(new Error('req: step to be defined'));
    expect(wizard.removeData(2)).toEqual(2);
  });

  it('removeData: setData should delete data', function () {
    wizard.setData(0, 'I am at 0');
    expect(wizard.removeData(0)).toEqual(0);
    expect(wizard.getData(0)).toBeUndefined();
  });

  it('updateStep: should throw an error', function () {
    expect(function () {
      wizard.updateStep('1');
    }).toThrow(new Error('req: number & > -1'));
    expect(function () {
      wizard.updateStep('-1');
    }).toThrow(new Error('req: number & > -1'));
    expect(function () {
      wizard.updateStep();
    }).toThrow(new Error('req: number & > -1'));
    expect(function () {
      wizard.updateStep(null);
    }).toThrow(new Error('req: number & > -1'));
  });

  it('updateStep: should update the step to 1', function () {
    expect(wizard.updateStep(1)).toEqual(1);
    expect(wizard.currentStep).toEqual(1);
    expect(wizard.updateStep(2)).toEqual(2);
    expect(wizard.currentStep).toEqual(2);
  });

  it('stepIncrement: should increment the step', function () {
    expect(wizard.stepIncrement()).toBeTruthy();
    expect(wizard.currentStep).toEqual(1);
    expect(wizard.stepIncrement()).toBeTruthy();
    expect(wizard.currentStep).toEqual(2);
  });

  it('stepDecrement: should decrement the step', function () {
    expect(function () {
      wizard.stepDecrement();
    }).toThrow(new Error('Current step should be > 0'));
    expect(wizard.currentStep).toEqual(0);
    wizard.stepIncrement();
    wizard.stepIncrement();
    expect(wizard.stepDecrement()).toEqual(1);
    expect(wizard.currentStep).toEqual(1);
  });

  it('formvalidation: status should equal to true', function () {
    expect(wizard.formValidationStatus).toEqual(true);
  });

  it('formvalidation: should equal to true', function () {
    expect(wizard.formValidation(true)).toEqual(true);
    expect(wizard.formValidation(false)).toEqual(false);
  });

  it('formvalidation: should throw an error', function () {
    expect(function () {
      wizard.formValidation(89);
    }).toThrow(new Error('req: Boolean'));
  });

  it('formvalidation: should equal to true', function () {
    wizard.formValidation(false);
    expect(wizard.getFormValidation()).toBeFalsy();
  });
});
