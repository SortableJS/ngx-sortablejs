import { InjectionToken } from '@angular/core';
import { SortablejsOptions } from './sortablejs-options';

export const GLOBALS: InjectionToken<SortablejsOptions> = new InjectionToken('Global config for sortablejs');
