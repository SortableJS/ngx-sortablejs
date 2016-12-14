import { Directive, ElementRef, Input, OnInit, OnChanges, OnDestroy, NgZone, SimpleChanges, SimpleChange } from '@angular/core';
import { FormArray } from '@angular/forms';
import { SortablejsOptions } from '../index.d';
import { SortablejsModule } from '../index';

// Sortable
let Sortable = require('sortablejs');

// original library calls the events in unnatural order
// first the item is added, then removed from the previous array
// this is a temporary event to work this around
// as long as only one sortable takes place at a certain time
// this is enough to have a single `global` event
let onremove: (item: any) => void;

@Directive({
  selector: '[sortablejs]'
})
export class SortablejsDirective implements OnInit, OnChanges, OnDestroy {

  @Input('sortablejs')
  private _items: any[] | FormArray;

  @Input('sortablejsOptions')
  private _options: SortablejsOptions;

  private _sortable: any;

  @Input() runInsideAngular: boolean = false;

  constructor(private element: ElementRef, private zone: NgZone) {}

  public ngOnInit() {
    // onChange???
    if (this.runInsideAngular) {
      this._sortable = new Sortable(this.element.nativeElement, this.options);
    } else {
      this.zone.runOutsideAngular(() => {
        this._sortable = new Sortable(this.element.nativeElement, this.options);
      });
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    const optionsChange: SimpleChange = changes['_options'];
    if (optionsChange && !optionsChange.isFirstChange()) {
      const previousOptions: SortablejsOptions = optionsChange.previousValue;
      const currentOptions: SortablejsOptions = optionsChange.currentValue;
      Object.keys(currentOptions).forEach(optionName => {
        if (currentOptions[optionName] !== previousOptions[optionName]) {
          // use low-level option setter
          this._sortable.option(optionName, currentOptions[optionName]);
        }
      });
    }
  }

  public ngOnDestroy() {
    this._sortable.destroy();
  }

  private get options() {
    return Object.assign({}, SortablejsModule._globalOptions, this._options, this.overridenOptions);
  }

  private proxyEvent(eventName: string, event: SortableEvent) {
    if (this._options && this._options[eventName]) {
      this._options[eventName](event);
    }
  }

  private get overridenOptions(): SortablejsOptions {
    if (this._items) {
      return {
        onAdd: (event: SortableEvent) => {
          onremove = (item: any) => {
            if (this._items instanceof FormArray) {
                this._items.insert(event.newIndex, item);
            } else {
                this._items.splice(event.newIndex, 0, item);
            }
          };

          this.proxyEvent('onAdd', event);
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
          this.proxyEvent('onRemove', event);
        },
        onUpdate: (event: SortableEvent) => {
          if (this._items instanceof FormArray) {
            let relocated = this._items.at(event.oldIndex);

            this._items.removeAt(event.oldIndex);
            this._items.insert(event.newIndex, relocated);
          } else {
            this._items.splice(event.newIndex, 0, this._items.splice(event.oldIndex, 1)[0]);
          }

          this.proxyEvent('onUpdate', event);
        }
      };
    }

    return {};
  }

}

interface SortableEvent { oldIndex: number; newIndex: number; }
