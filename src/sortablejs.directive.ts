import { Directive, ElementRef, Inject, Input, NgZone, OnChanges, OnDestroy, OnInit, Optional, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import { GLOBALS } from './globals';
import { SortablejsBindingTarget } from './sortablejs-binding-target';
import { SortablejsBindings } from './sortablejs-bindings';
import { SortablejsOptions } from './sortablejs-options';
import { SortablejsService } from './sortablejs.service';

const OriginalSortable: any = require('sortablejs');

@Directive({
  selector: '[sortablejs]'
})
export class SortablejsDirective implements OnInit, OnChanges, OnDestroy {

  @Input()
  sortablejs: SortablejsBindingTarget; // array or a FormArray

  @Input('sortablejsOptions')
  inputOptions: SortablejsOptions;

  @Input('sortablejsCloneFunction')
  inputCloneFunction: <T>(item: T) => T;

  private _sortable: any;

  @Input() runInsideAngular = false;

  constructor(
    @Optional() @Inject(GLOBALS) private globalConfig: SortablejsOptions,
    private service: SortablejsService,
    private element: ElementRef,
    private zone: NgZone,
    private renderer: Renderer2,
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
          this._sortable.option(optionName, this.options[optionName]);
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
    return { ...this.optionsWithoutEvents, ...this.overridenOptions };
  }

  private get optionsWithoutEvents() {
    return { ...(this.globalConfig || {}), ...(this.inputOptions || {})};
  }

  private proxyEvent(eventName: string, ...params: any[]) {
    this.zone.run(() => { // re-entering zone, see https://github.com/SortableJS/angular-sortablejs/issues/110#issuecomment-408874600
      if (this.optionsWithoutEvents && this.optionsWithoutEvents[eventName]) {
        this.optionsWithoutEvents[eventName](...params);
      }
    });
  }

  private get isCloning() {
    return this._sortable.options.group.checkPull(this._sortable, this._sortable) === 'clone';
  }

  private clone<T>(item: T): T {
    // by default pass the item through, no cloning performed
    return (this.inputCloneFunction || (_item => _item))(item);
  }

  private get overridenOptions(): SortablejsOptions {
    // always intercept standard events but act only in case items are set (bindingEnabled)
    // allows to forget about tracking this.items changes
    return {
      onAdd: (event: SortableEvent) => {
        this.service.transfer = (items: any[]) => {
          this.getBindings().injectIntoEvery(event.newIndex, items);
          this.proxyEvent('onAdd', event);
        };

        this.proxyEvent('onAddOriginal', event);
      },
      onRemove: (event: SortableEvent) => {
        const bindings = this.getBindings();

        if (bindings.provided) {
          if (this.isCloning) {
            this.service.transfer(bindings.getFromEvery(event.oldIndex).map(item => this.clone(item)));

            // great thanks to https://github.com/tauu
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
            this.service.transfer(bindings.extractFromEvery(event.oldIndex));
          }

          this.service.transfer = null;
        }

        this.proxyEvent('onRemove', event);
      },
      onUpdate: (event: SortableEvent) => {
        const bindings = this.getBindings();

        bindings.injectIntoEvery(event.newIndex, bindings.extractFromEvery(event.oldIndex));
        this.proxyEvent('onUpdate', event);
      },
    };
  }

}

interface SortableEvent { oldIndex: number; newIndex: number; item: HTMLElement; clone: HTMLElement }
