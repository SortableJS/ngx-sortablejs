import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortablejsDirective } from './src/sortable.directive';
import { SortablejsOptions } from './index.d';

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
