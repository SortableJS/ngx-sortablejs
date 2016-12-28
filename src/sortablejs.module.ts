import { NgModule } from '@angular/core';
import { SortablejsDirective } from './sortablejs.directive';
import { SortablejsOptions } from './sortablejs-options';

@NgModule({
  declarations: [ SortablejsDirective ],
  exports: [ SortablejsDirective ]
})
export class SortablejsModule {

  public static _globalOptions: SortablejsOptions = {};

  public static forRoot(globalOptions: SortablejsOptions) {
    SortablejsModule._globalOptions = globalOptions;

    return SortablejsModule;
  }

}
