import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { FormArray } from '@angular/forms';
import { SortablejsConfiguration } from '../index';
import { SortablejsOptions } from '../index.d';

let Sortablejs = {
  Sortable: require('sortablejs')
};

@Directive({
  selector: '[sortablejs]'
})
export class SortableDirective implements OnInit, OnDestroy {

  @Input('sortablejs')
  private _items: any[] | FormArray;

  @Input('sortablejsOptions')
  private _options: SortablejsOptions;

  private _sortable: Sortablejs.Sortable;

  private static moveArrayItem(array: any[], from: number, to: number) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  }

  private static moveFormArrayItem(formArray: FormArray, from: number, to: number) {
    let relocated = formArray.at(from);

    formArray.removeAt(from);
    formArray.insert(to, relocated);
  }

  constructor(private element: ElementRef) {}

  public ngOnInit() {
    // onChange???
    this._sortable = new Sortablejs.Sortable(this.element.nativeElement, this.options);
  }

  public ngOnDestroy() {
    this._sortable.destroy();
  }

  private get options() {
    return Object.assign({}, SortablejsConfiguration.defaults, this._options, this.overridenOptions);
  }

  private get overridenOptions(): SortablejsOptions {
    if (this._items) {
      return {
        onEnd: (event: { oldIndex: number; newIndex: number; }) => {
          if (this._items instanceof FormArray) {
            SortableDirective.moveFormArrayItem(<FormArray>this._items, event.oldIndex, event.newIndex);
          } else {
            SortableDirective.moveArrayItem(<any[]>this._items, event.oldIndex, event.newIndex);
          }

          if (this._options && this._options.onEnd) {
            this._options.onEnd(event);
          }
        }
      };
    }

    return {};
  }

}
