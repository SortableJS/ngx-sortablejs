# angular-sortablejs

This package is an Angular 2 binding for awesome [Sortable.js](https://github.com/RubaXa/Sortable) library which supports both Webpack and SystemJS.

If you are not rc5 compliant yet, keep using the version 0.1.1.

## Installation

    npm install --save angular-sortablejs

Note: you **do not** need to install Sortable.js! It will be installed automatically.

## Usage

### Example

First, import `SortablejsModule` into the angular module where you want to use it:

```typescript
imports: [
  ...
  SortablejsModule,
  ...
]
```

Then the you can use it in your component:

```typescript
import { Component } from '@angular/core';

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
    `
})
export class AppComponent {
   items = [1, 2, 3, 4, 5];
}
```

We use `sortablejs` property on a container HTML element to tell Angular that this is a sortable container. We also pass the `items` array to both `*ngFor` and [sortablejs] to register the changes automatically (this is done inside of original Sortable.js `onEnd` event).

That's just it... if you use the Webpack. If you use original Angular shipping with SystemJS you would need to follow the step below.

### SystemJS additional configuration

Adapt your `systemjs.config.js` (or another place where you configure SystemJS) file with the following:

```javascript
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
```

This is important to let SystemJS know everything it needs about the dependencies it needs to load.

## API and functionality

### Ordering items

The array is automatically updated because you pass the `items` as `<div [sortablejs]="items">`. The `items` variable can be either a JavaScript array or Angular rc2+ forms `FormArray`. If you won't pass anything, e.g. `<div sortablejs>`, the items won't be automatically updated, thus you should take care of updating the array on your own.

### Passing options object

Pass the options with `sortablejsOptions` property. If we extend the example above with the options it will look like the following:

```typescript
import { Component } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';

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
```

### Global options configuration

If you want to use the same sortable options across different places of your application you might want to set up global configuration. Add the following to your main module to enable e.g. `animation: 150` everywhere:

```typescript
imports: [
  ...
  // any properties and events available on original library work here as well
  SortablejsModule.forRoot({
    animation: 150
  }),
  ...
]
```

This value will be used as a default one, but it can be overriden by `sortablejsOptions` property.
