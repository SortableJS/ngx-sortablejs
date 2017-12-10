import {
  Directive, ElementRef, Input, OnInit, OnChanges, OnDestroy, NgZone, SimpleChanges, SimpleChange,
  ChangeDetectorRef, Inject, Optional
} from '@angular/core';
import { SortablejsOptions } from './sortablejs-options';
import { GLOBALS } from './globals';
import { SortablejsService } from './sortablejs.service';
import { SortablejsBindingTarget } from './sortablejs-binding-target';
import { SortablejsBindings } from './sortablejs-bindings';

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
    private cdr: ChangeDetectorRef,
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
    return { ...this.optionsWithoutEvents, ...this.overridenOptions };
  }

  private get optionsWithoutEvents() {
    return { ...(this.globalConfig || {}), ...(this.inputOptions || {})};
  }

  private proxyEvent(eventName: string, ...params: any[]) {
    if (this.optionsWithoutEvents && this.optionsWithoutEvents[eventName]) {
      this.optionsWithoutEvents[eventName](...params);
    }

    this.cdr.detectChanges();
  }

  private get isCloning() {
    return this._sortable.options.group.checkPull(this._sortable, this._sortable) === 'clone';
  }

  private clone<T>(item: T): T {
    return (this.inputCloneFunction || (item => item))(item);
  }

  private get overridenOptions(): SortablejsOptions {
    // always intercept standard events but act only in case items are set (bindingEnabled)
    // allows to forget about tracking this.items changes
    return {
      onAdd: (event: SortableEvent) => {
        this.service.transfer = (items: any[]) => this.getBindings().injectIntoEvery(event.newIndex, items);
        this.proxyEvent('onAdd', event);
      },
      onRemove: (event: SortableEvent) => {
        const bindings = this.getBindings();

        if (bindings.provided) {
          if (this.isCloning) {
            this.service.transfer(bindings.getFromEvery(event.oldIndex).map(item => this.clone(item)));
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

interface SortableEvent { oldIndex: number; newIndex: number; }
