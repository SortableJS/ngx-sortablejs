import {
  Directive, ElementRef, Input, OnInit, OnChanges, OnDestroy, NgZone, SimpleChanges, SimpleChange,
  ChangeDetectorRef, Inject, Optional, Renderer2
} from '@angular/core';
import { SortablejsOptions } from './sortablejs-options';
import { GLOBALS } from './globals';
import { SortablejsService } from './sortablejs.service';
import { SortablejsBindingTarget } from './sortablejs-binding-target';
import { SortablejsBindings } from './sortablejs-bindings';
import * as _ from 'lodash';

const OriginalSortable: any = require('sortablejs');

@Directive({
  selector: '[sortablejs]'
})
export class SortablejsDirective implements OnInit, OnChanges, OnDestroy {

  @Input('sortablejs')
  sortablejs: SortablejsBindingTarget; // array or a FormArray

  @Input('sortablejsOptions')
  inputOptions: SortablejsOptions;

  private _sortable: any;

  @Input() runInsideAngular = false;

  constructor(
    @Optional() @Inject(GLOBALS) private globalConfig: SortablejsOptions,
    private service: SortablejsService,
    private element: ElementRef,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  public ngOnInit() {
    if (this.runInsideAngular) {
      this._sortable = OriginalSortable.create(this.element.nativeElement, this.options);
    } else {
      this.zone.runOutsideAngular(() => {
        this._sortable = OriginalSortable.create(this.element.nativeElement, this.options);
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
    if (this._sortable) {
      this._sortable.destroy();
    }
  }

  private getBindings(): SortablejsBindings {
    if (!this.sortablejs) {
      return new SortablejsBindings([]);
    } else if (this.sortablejs instanceof SortablejsBindings) {
      return this.sortablejs;
    } else {
      return new SortablejsBindings([this.sortablejs]);
    }
  }

  private get options() {
    return Object.assign({}, this.globalConfig || {}, this.inputOptions, this.overridenOptions);
  }

  private proxyEvent(eventName: string, event: SortableEvent) {
    if (this.inputOptions && this.inputOptions[eventName]) {
      this.inputOptions[eventName](event);
    }

    this.cdr.detectChanges();
  }

  private get overridenOptions(): SortablejsOptions {
    // always intercept standard events but act only in case items are set (bindingEnabled)
    // allows to forget about tracking this.items changes
    return {
      onAdd: (event: SortableEvent) => {
        this.service.onremove = (items: any[]) => {this.getBindings().injectIntoEvery(event.newIndex, items); this.cdr.detectChanges(); };
        this.proxyEvent('onAdd', event);
      },
      onRemove: (event: SortableEvent) => {
        const bindings = this.getBindings();

        if (bindings.provided) {
          let items;
          if (this._sortable.options.group.checkPull(this._sortable,this._sortable) == 'clone') {
            // clone existing items
            items = _.cloneDeep(bindings.getFromEvery(event.oldIndex)); 
            // event.item is the original item from the source list which is moved to the target list
            // event.clone is a clone of the original item and will be added to source list
            // If bindings are provided, adding the item dom element to the target list causes artifacts
            // as it interferes with the rendering performed by the angular template. 
            // Therefore we remove it immediately and also move the original item back to the source list.
            // (event handler may be attached to the original item and not its clone, therefore keeping
            // the original dom node, circumvents side effects )
            this.renderer.removeChild(event.item.parentNode, event.item);
            this.renderer.insertBefore(event.clone.parentNode, event.item, event.clone);
            this.renderer.removeChild(event.clone.parentNode, event.clone);
          } else {
            // extract existing items and remove them
            items = bindings.extractFromEvery(event.oldIndex);
          }
          // trigger callback to add these items to the target list
          this.service.onremove(items);
          this.service.onremove = null;
        }

        this.proxyEvent('onRemove', event);
      },
      onUpdate: (event: SortableEvent) => {
        const bindings = this.getBindings();

        bindings.injectIntoEvery(event.newIndex, bindings.extractFromEvery(event.oldIndex));
        this.proxyEvent('onUpdate', event);
      }
    };
  }

}

interface SortableEvent { oldIndex: number; newIndex: number; item: any, clone: any}
