import {ModuleWithProviders, NgModule} from '@angular/core';
import {GLOBALS} from './globals';
import {SortablejsDirective} from './sortablejs.directive';
import {Options} from 'sortablejs';

@NgModule({
  declarations: [SortablejsDirective],
  exports: [SortablejsDirective],
})
export class SortablejsModule {

  public static forRoot(globalOptions: Options): ModuleWithProviders<SortablejsModule> {
    return {
      ngModule: SortablejsModule,
      providers: [
        {provide: GLOBALS, useValue: globalOptions},
      ],
    };
  }

}
