import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SortablejsModule } from 'ngx-sortablejs';
import { MultipleListsComponent } from './multiple-lists/multiple-lists.component';
import { SimpleSortableComponent } from './simple-sortable/simple-sortable.component';
import { SortableFormArrayComponent } from './sortable-form-array/sortable-form-array.component';
import { SortableWithOptionsComponent } from './sortable-with-options/sortable-with-options.component';

@NgModule({
  imports: [
    CommonModule,
    SortablejsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SimpleSortableComponent,
    SortableWithOptionsComponent,
    SortableFormArrayComponent,
    MultipleListsComponent,
  ],
})
export class ExamplesModule { }
