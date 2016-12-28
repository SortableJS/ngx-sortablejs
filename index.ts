import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortablejsDirective } from './src/sortable.directive';

export interface SortablejsOptions {
  group?: any;
  sort?: boolean;
  delay?: number;
  disabled?: boolean;
  store?: {
    get: (sortable: any) => any[];
    set: (sortable: any) => any;
  };
  animation?: number;
  handle?: string;
  filter?: any;
  draggable?: string;
  ghostClass?: string;
  chosenClass?: string;
  dataIdAttr?: string;
  forceFallback?: boolean;
  fallbackClass?: string;
  fallbackOnBody?: boolean;
  scroll?: boolean;
  scrollSensitivity?: number;
  scrollSpeed?: number;
  setData?: (dataTransfer: any, draggedElement: any) => any;
  onStart?: (event: any) => any;
  onEnd?: (event: any) => any;
  onAdd?: (event: any) => any;
  onUpdate?: (event: any) => any;
  onSort?: (event: any) => any;
  onRemove?: (event: any) => any;
  onFilter?: (event: any) => any;
  onMove?: (event: any) => boolean;
}

@NgModule({
  declarations: [ SortablejsDirective ],
  imports: [ CommonModule ],
  exports: [ SortablejsDirective ]
})
export class SortablejsModule {

  public static _globalOptions: SortablejsOptions = {};

  public static forRoot(globalOptions: SortablejsOptions) {
    SortablejsModule._globalOptions = globalOptions;

    return SortablejsModule;
  }

}
