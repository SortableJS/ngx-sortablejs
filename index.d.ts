import { ModuleWithProviders } from '@angular/core';

export declare class SortablejsModule {
  static forRoot(globalOptions: SortablejsOptions): ModuleWithProviders;
}

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
