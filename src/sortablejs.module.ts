import { ModuleWithProviders, NgModule } from '@angular/core';
import { SortablejsOptions } from './sortablejs-options';
import { GLOBALS } from './globals';
import { SortablejsDirective } from './sortablejs.directive';
import { SortablejsService } from './sortablejs.service';

@NgModule({
  declarations: [SortablejsDirective],
  exports: [SortablejsDirective],
  providers: [SortablejsService]
})
export class SortablejsModule {

  public static forRoot(globalOptions: SortablejsOptions): ModuleWithProviders {
    return {
      ngModule: SortablejsModule,
      providers: [
        SortablejsService,
        {provide: GLOBALS, useValue: globalOptions}
      ]
    };
  }

}
