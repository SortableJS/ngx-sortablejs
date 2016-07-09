# angular-sortablejs

This package is an Angular 2 binding for awesome [Sortable.js](https://github.com/RubaXa/Sortable) library which supports both Webpack and SystemJS.

## Installation

    npm install --save angular-sortablejs

Note: you **do not** need to install Sortable.js! It will be installed automatically.

## Usage

### Example

First, include `SORTABLEJS_DIRECTIVES` into your component:

    import { Component } from '@angular/core';
    import { SORTABLEJS_DIRECTIVES } from 'angular-sortablejs';

    @Component({
        selector: 'my-app',
        template: `
          <h2>Drag / drop the item</h2>
          <div [sortablejs]="items">
            <div *ngFor="let item of items">{{ item }}</div>
          </div>

          <hr>

          <h2>See the result</h2>
          <div>
            <div *ngFor="let item of items">{{ item }}</div>
          </div>
        `,
        directives: [ SORTABLEJS_DIRECTIVES ]
    })
    export class AppComponent {
       items = [1, 2, 3, 4, 5];
    }

Here we importing `SORTABLEJS_DIRECTIVES` and referring them as directives in our metadata. Then we use `sortablejs` property on a container HTML element to tell Angular that this is a sortable container. We also pass the `items` array to both `*ngFor` and [sortablejs] to register the changes automatically (this is done inside of original Sortable.js onEnd event).

That's just it... if you use the Webpack. If you use original Angular shipping with SystemJS you would need to follow the step below.

### SystemJS additional configuration

Add to your `systemjs.config.js` (or another place where you configure SystemJS) file the following:

    ...
    var map = {
      ...
      'angular-sortablejs': 'node_modules/angular-sortablejs',
      'sortablejs': 'node_modules/sortablejs/Sortable.js',
      ...    
    };
    ...
    var packages = {
      ...
      'angular-sortablejs': { main: 'index.js', defaultExtension: 'js' },
      ...
    };
    ...
    var config = {
      map: map,
      packages: packages
    };

    System.config(config);

This is important to let SystemJS everything it needs about the dependencies.

## API and functionality

### Ordering items

The array is automatically updated because you pass the `items` as `<div [sortablejs]="items">`. The `items` variable can be either a JavaScript array or Angular rc2+ forms `FormArray`. If you won't pass anything, e.g. `<div sortablejs>`, the items won't be automatically updated, thus you should take care of updating the array on your own.

### Passing options object

Pass the options with `sortablejsOptions` property. If we extend the example above with the options it will look like the following:

    import { Component } from '@angular/core';
    import { SortablejsOptions, SORTABLEJS_DIRECTIVES } from 'angular-sortablejs';

    @Component({
        selector: 'my-app',
        template: `
          <h2>Drag / drop the item</h2>
          <div [sortablejs]="items" [sortablejsOptions]="options">
            <div *ngFor="let item of items">{{ item }}</div>
          </div>

          <hr>

          <h2>See the result</h2>
          <div>
            <div *ngFor="let item of items">{{ item }}</div>
          </div>
        `,
        directives: [ SORTABLEJS_DIRECTIVES ]
    })
    export class AppComponent {
       items = [1, 2, 3, 4, 5];

       options: SortablejsOptions = {
         animation: 150
       };
    }

### Global options configuration

If you want to use the same sortable options across different places of your application you might want to set up global configuration. Add the following to your main file to enable e.g. `animation: 150` everywhere:

    import { SortablejsConfiguration } from 'angular-sortablejs';

    // any properties and events available on original library work here as well
    SortablejsConfiguration.defaults.animation = 150;

This value will be used as default one, but can be overriden by `sortablejsOptions` property.
