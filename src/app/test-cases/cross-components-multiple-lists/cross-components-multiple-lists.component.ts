import { Component } from '@angular/core';

@Component({
  selector: 'app-cross-components-multiple-lists',
  templateUrl: './cross-components-multiple-lists.component.html',
  styleUrls: ['./cross-components-multiple-lists.component.css'],
})
export class CrossComponentsMultipleListsComponent {

  list1 = [
    '1',
    '2',
    '3',
    '4',
    '5',
  ];

  list2 = [
    '6',
    '7',
    '8',
    '9',
    '10',
  ];

}
