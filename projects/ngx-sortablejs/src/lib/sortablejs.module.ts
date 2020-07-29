import { ModuleWithProviders, NgModule } from '@angular/core';
import { GLOBALS } from './globals';
import { SortablejsOptions } from './sortablejs-options';
import { SortablejsDirective } from './sortablejs.directive';

@NgModule({
  declarations: [SortablejsDirective],
  exports: [SortablejsDirective],
})
export class SortablejsModule {

  public static forRoot(globalOptions: SortablejsOptions): ModuleWithProviders<SortablejsModule> {
    return {
      ngModule: SortablejsModule,
      providers: [
        { provide: GLOBALS, useValue: globalOptions },
      ],
    };
  }

}
