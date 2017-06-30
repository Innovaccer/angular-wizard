# `angular-wizard` — the multistep form
It's a wizard package to make **Multistep view** and **Multistep forms**.

## Featues
- Simple Directive flow.
- Easy validation for forms.
- Pass your template, scope and controller.

### Prerequisites
- Angular JS 1.5.x

### Uses

#### Setting it up
```
<form-wizard steps="steps">
  <steps></steps>
  <control-panel></control-panel>
</form-wizard>
```

You can remove steps or control panel if you want to customize it.

Pass steps as follows:
```
$scope.steps = [{
  name: 'Profile',
  templateUrl : 'profile.html',
  controller: 'ProfileController',
  scope : $scope
},
{
  name: 'Interests',
  template : '<h1>form-interests</h1>'
},
{
  name: 'Submit',
  template : '<h1>form-submit</h1>',
  controller: 'ProfileController',
  scope : $scope
}
];
```

#### Getting Data
pass `$scope.model` object to bind your data to `wizardService`. You can get your data by accessing `wizardService.data`.

#### Clone `angular-module-boilerplate`

Clone the `angular-module-boilerplate` repository using git:

```
git clone https://github.com/ayusharma/angular-module-boilerplate.git
cd angular-module-boilerplate
```

If you just want to start a new project without the `angular-module-boilerplate` commit history then you can do:

```
git clone --depth=1 https://github.com/ayusharma/angular-module-boilerplate.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`. After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `demo/bower_components` - contains the Angular framework files

###  Building Module

```js
  gulp build
```
