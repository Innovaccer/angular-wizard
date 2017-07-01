/**
 * Created by Ayush Sharma
 */

import angular from 'angular';

import wizard from './services/wizard';
import container from './directives/container/container';
import panel from './directives/controls/panel';
import steps from './directives/steps/steps';
import validation from './directives/steps/validation';


const wizardModule = angular.module('wizard', []);

wizardModule
.service('wizard', wizard)
.directive('formWizard', container)
.directive('panel', panel)
.directive('steps', steps)
.directive('formStepValidity', validation);

export default wizardModule;
