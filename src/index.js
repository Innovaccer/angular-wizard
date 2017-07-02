/**
 * Created by Ayush Sharma
 */

import angular from 'angular';

import wizard from './services/wizard.js';
import container from './directives/container/container.js';
import panel from './directives/controls/panel.js';
import steps from './directives/steps/steps.js';
import validation from './directives/steps/validation.js';


const wizardModule = angular.module('wizard', []);

wizardModule
.service('wizard', wizard)
.directive('formWizard', container)
.directive('controls', panel)
.directive('steps', steps)
.directive('formStepValidity', validation);

export default wizardModule;
