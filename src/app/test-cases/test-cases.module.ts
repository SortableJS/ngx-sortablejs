import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SortablejsModule } from 'ngx-sortablejs';
import { ChildComponentComponent } from './cross-components-multiple-lists/child-component/child-component.component';
import { CrossComponentsMultipleListsComponent } from './cross-components-multiple-lists/cross-components-multiple-lists.component';

@NgModule({
  imports: [
    CommonModule,
    SortablejsModule,
  ],
  declarations: [CrossComponentsMultipleListsComponent, ChildComponentComponent],
})
export class TestCasesModule { }
