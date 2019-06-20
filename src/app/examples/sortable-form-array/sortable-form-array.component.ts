import { Component } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sortable-form-array',
  templateUrl: './sortable-form-array.component.html',
  styleUrls: ['./sortable-form-array.component.css'],
})
export class SortableFormArrayComponent {

  citiesControls = new FormArray([
    'Ankara',
    'Moscow',
    'Munich',
    'Paris',
    'Washington',
  ].map(city => new FormControl(city)));

}
