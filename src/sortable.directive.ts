import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { FormArray } from '@angular/forms';
import { SortablejsOptions } from '../index.d';
import { SortablejsModule } from '../index';

let Sortable = require('sortablejs');

@Directive({
  selector: '[sortablejs]'
})
export class SortablejsDirective implements OnInit, OnDestroy {

  @Input('sortablejs')
  private _items: any[] | FormArray;

  @Input('sortablejsOptions')
  private _options: SortablejsOptions;

  private _sortable: any;

  constructor(private element: ElementRef) {}

  public ngOnInit() {
    // onChange???
    this._sortable = new Sortable(this.element.nativeElement, this.options);
  }

  public ngOnDestroy() {
    this._sortable.destroy();
  }

  private get options() {
    return Object.assign({}, SortablejsModule._globalOptions, this._options, this.overridenOptions);
  }

  private proxyEvent(eventName: string) {
    if (this._options && this._options[eventName]) {
      this._options[eventName](event);
    }
  }

  private get overridenOptions(): SortablejsOptions {
    if (this._items) {
      // original library calls the events in unnatural order
      // first the item is added, then removed from the previous array
      // this is a temporary event to work this around
      let onremove: (item: any) => void;

      return {
        onAdd: (event: SortableEvent) => {
          onremove = (item: any) => {
            if (this._items instanceof FormArray) {
                this._items.insert(event.newIndex, item);
            } else {
                this._items.splice(event.newIndex, 0, item);
            }
          };

          this.proxyEvent('onAdd');
        },
        onRemove: (event: SortableEvent) => {
          let item: any;

          if (this._items instanceof FormArray) {
              item = this._items.at(event.oldIndex);
              this._items.removeAt(event.oldIndex);
          } else {
              item = this._items.splice(event.oldIndex, 1)[0];
          }

          onremove(item);
          onremove = null;
          this.proxyEvent('onRemove');
        },
        onUpdate: (event: SortableEvent) => {
          if (this._items instanceof FormArray) {
            let relocated = this._items.at(event.oldIndex);

            this._items.removeAt(event.oldIndex);
            this._items.insert(event.newIndex, relocated);
          } else {
            this._items.splice(event.newIndex, 0, this._items.splice(event.oldIndex, 1)[0]);
          }

          this.proxyEvent('onUpdate');
        }
      };
    }

    return {};
  }

}

interface SortableEvent { oldIndex: number; newIndex: number; }
