/**
 * Created by Ayush Sharma
 */
import app from './app.js';
import './services/wizard.js';
import container from './directives/container/container.js';
import panel from './directives/controls/panel.js';
import steps from './directives/steps/steps.js';
import validation from './directives/steps/validation.js';

app
.directive('formWizard', container)
.directive('controls', panel)
.directive('steps', steps)
.directive('formStepValidity', validation);

export default app;
