import { Directive, ElementRef, Input, OnInit, OnChanges, OnDestroy, NgZone, SimpleChanges, SimpleChange } from '@angular/core';
import { FormArray } from '@angular/forms';
import { SortablejsOptions } from './sortablejs-options';
import { SortablejsModule } from './sortablejs.module';

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
  items: any[] | FormArray;

  @Input('sortablejsOptions')
  inputOptions: SortablejsOptions;

  private _sortable: any;

  @Input() runInsideAngular: boolean = false;

  constructor(private element: ElementRef, private zone: NgZone) {}

  public ngOnInit() {
    if (this.runInsideAngular) {
      this._sortable = new Sortable(this.element.nativeElement, this.options);
    } else {
      this.zone.runOutsideAngular(() => {
        this._sortable = new Sortable(this.element.nativeElement, this.options);
      });
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    const optionsChange: SimpleChange = changes['inputOptions'];
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
    return Object.assign({}, SortablejsModule._globalOptions, this.inputOptions, this.overridenOptions);
  }

  private proxyEvent(eventName: string, event: SortableEvent) {
    if (this.inputOptions && this.inputOptions[eventName]) {
      this.inputOptions[eventName](event);
    }
  }

  // returns whether the items are currently set
  private get bindingEnabled() {
    return !!this.items;
  }

  private get overridenOptions(): SortablejsOptions {
    // always intercept standard events but act only in case items are set (bindingEnabled)
    // allows to forget about tracking this.items changes
    return {
      onAdd: (event: SortableEvent) => {
        if (this.bindingEnabled) {
          onremove = (item: any) => {
            if (this.items instanceof FormArray) {
                this.items.insert(event.newIndex, item);
            } else {
                this.items.splice(event.newIndex, 0, item);
            }
          };
        }

        this.proxyEvent('onAdd', event);
      },
      onRemove: (event: SortableEvent) => {
        if (this.bindingEnabled) {
          let item: any;

          if (this.items instanceof FormArray) {
              item = this.items.at(event.oldIndex);
              this.items.removeAt(event.oldIndex);
          } else {
              item = this.items.splice(event.oldIndex, 1)[0];
          }

          onremove(item);
          onremove = null;
        }

        this.proxyEvent('onRemove', event);
      },
      onUpdate: (event: SortableEvent) => {
        if (this.bindingEnabled) {
          if (this.items instanceof FormArray) {
            let relocated = this.items.at(event.oldIndex);

            this.items.removeAt(event.oldIndex);
            this.items.insert(event.newIndex, relocated);
          } else {
            this.items.splice(event.newIndex, 0, this.items.splice(event.oldIndex, 1)[0]);
          }
        }

        this.proxyEvent('onUpdate', event);
      }
    };
  }

}

interface SortableEvent { oldIndex: number; newIndex: number; }
