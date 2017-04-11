import { NgModule, ModuleWithProviders } from '@angular/core';
import { SortablejsDirective } from './sortablejs.directive';
import { SortablejsOptions } from './sortablejs-options';
import { SortablejsService } from './sortablejs.service';

@NgModule({
  declarations: [ SortablejsDirective ],
  exports: [ SortablejsDirective ],
  providers: [ SortablejsService ]
})
export class SortablejsModule {

  public static _globalOptions: SortablejsOptions = {};

  public static forRoot(globalOptions: SortablejsOptions): ModuleWithProviders {
    SortablejsModule._globalOptions = globalOptions;

    return {
        ngModule: SortablejsModule,
        providers: [
            SortablejsService
        ]
    };
  }

}
