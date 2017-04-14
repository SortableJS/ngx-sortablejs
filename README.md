# angular-sortablejs

This package is an Angular 2 binding for [Sortable.js](https://github.com/RubaXa/Sortable). Supports standard arrays and Angular `FormArray`.

## Installation

Angular 4.x (angular-sortablejs@2.x.x; sortablejs must be installed separately)

```sh
npm install --save sortablejs && npm install --save angular-sortablejs
```

Angular 2.x (angular-sortablejs@1.x.x; sortablejs is included)

```sh
npm install --save angular-sortablejs@1.3.1
```

### Webpack configuration

There is nothing to configure additionally. Enjoy!

### SystemJS configuration

Adapt your `systemjs.config.js` (or another place where you configure SystemJS) file with the following:

```javascript
// ...
var map = {
  // ...
  'angular-sortablejs': 'node_modules/angular-sortablejs/dist/',
  'sortablejs/Sortable.min': 'node_modules/sortablejs/Sortable.min.js',
  // ...
};
// ...
var packages = {
  // ...
  'angular-sortablejs': { main: 'index.js', defaultExtension: 'js' },
  // ...
};
// ...
var config = {
  map: map,
  packages: packages
};

System.config(config);
```

This is important to let SystemJS know everything it needs about the dependencies it needs to load.

## Usage

First, import `SortablejsModule` into the angular module where you want to use it:

```typescript
imports: [
  // ...
  SortablejsModule,
  // ...
]
```

Then use `sortablejs` property on a container HTML element to tell Angular that this is a sortable container; also pass the `items` array to both `*ngFor` and `[sortablejs]` to register the changes automatically.

## Simple sortable list

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

### Passing the options

Pass the options with `sortablejsOptions` property.

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
      <h2>Drag / drop the item</h2>
      <div [sortablejs]="items" [sortablejsOptions]="{ animation: 150 }">
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

### Tracking lists update events

You can use the options' `onUpdate` method to track the changes (see also *Passing the options* section):

```ts
constructor() {
  this.options = {
    onUpdate: (event: any) => {
      this.postChangesToServer();
    }
  };
}
```

If you use FormArray you are able to choose a more elegant solution:

```ts
public items = new FormArray([
  new FormControl(1),
  new FormControl(2),
  new FormControl(3),
]);

constructor() {
  this.items.valueChanges.subscribe(() => {
    this.postChangesToServer(this.items.value);
  });
}
```

but note, that here you will be able to take the whole changed array only (no oldIndex / newIndex).

### Updating the options

You can pass a new options object at anytime via the `[sortablejsOptions]` binding and the Angular's change detection will check for the changes from the previous options and will call the low level option setter from [Sortable.js](https://github.com/RubaXa/Sortable) to set the new option values.
> Note: It will only detect changes when a brand new options object is passed, not deep changes.

### Drag & drop between two lists

The only thing which should be done is assigning the `group` option to the both list. Everything else is handled automatically.

```typescript
import { Component } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
    selector: 'my-app',
    template: `
    <h2>Drag / drop the item</h2>
    <h3>list 1</h3>
    <div class="items1" [sortablejs]="items1" [sortablejsOptions]="options">
      <div *ngFor="let item of items1">{{ item }}</div>
    </div>
    <h3>list 2</h3>
    <div class="items2" [sortablejs]="items2" [sortablejsOptions]="options">
      <div *ngFor="let item of items2">{{ item }}</div>
    </div>

    <hr>

    <h2>See the result</h2>
    <div>
      <h3>list 1</h3>
      <div *ngFor="let item of items1">{{ item }}</div>
      <h3>list 2</h3>
      <div *ngFor="let item of items2">{{ item }}</div>
    </div>
    `
})
export class AppComponent {
   items1 = [1, 2, 3, 4, 5];
   items2 = ['a', 'b', 'c', 'd', 'e'];

   options: SortablejsOptions = {
     group: 'test'
   };
}
```
### Bind events inside Angular zone

By default, the boolean parameter **runInsideAngular** is set to **false**.
This means that the initial binding of all mouse events of the component will be set so that they **will not** trigger Angular's change detection.

If this parameter is set to true, then for large components - with a lot of data bindings - the UI will function in a staggered and lagging way (mainly when dragging items), while every event will trigger the change detection (which might be needed in some special edge cases).

### Configure the options globally

If you want to use the same sortable options across different places of your application you might want to set up global configuration. Add the following to your main module to enable e.g. `animation: 150` everywhere:

```typescript
imports: [
  // ...
  // any properties and events available on original library work here as well
  SortablejsModule.forRoot({
    animation: 150
  }),
  // ...
]
```

This value will be used as a default one, but it can be overwritten by a local `sortablejsOptions` property.

## How it works

The model is automatically updated because you pass the `items` as `<div [sortablejs]="items">`. The `items` variable can be either an ordinary JavaScript array or a reactive forms `FormArray`.

If you won't pass anything, e.g. `<div sortablejs>`, the items won't be automatically updated, thus you should take care of updating the array on your own using standard `Sortable.js` events.

Original events `onAdd`, `onRemove`, `onUpdate` are intercepted by the library in order to reflect the sortable changes into the data. If you will add your own event handlers (inside of the options object) they will be called right after the data binding is done. If you don't pass the data, e.g. `<div sortablejs>` the data binding is skipped and only your event handlers will be fired.
