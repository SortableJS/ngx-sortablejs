import { Component } from '@angular/core';
import { SortablejsOptions } from 'ngx-sortablejs';

@Component({
  selector: 'app-multiple-lists',
  templateUrl: './multiple-lists.component.html',
  styleUrls: ['./multiple-lists.component.css'],
})
export class MultipleListsComponent {

  // normal groups
  normalList1 = [
    '1',
    '2',
    '3',
    '4',
    '5',
  ];

  normalList2 = [
    '6',
    '7',
    '8',
    '9',
    '10',
  ];

  normalOptions: SortablejsOptions = {
    group: 'normal-group',
  };

  // clone groups
  // normal groups
  cloneList1 = [
    '1',
    '2',
    '3',
    '4',
    '5',
  ];

  cloneList2 = [
    '6',
    '7',
    '8',
    '9',
    '10',
  ];

  clone1Options: SortablejsOptions = {
    group: {
      name: 'clone-group',
      pull: 'clone',
      put: false,
    },
  };

  clone2Options: SortablejsOptions = {
    group: 'clone-group',
  };

  // super example
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

  list3 = [
    '11',
    '12',
  ];

  list4 = [
    '13',
  ];

  list1Options: SortablejsOptions = {
    group: {
      name: 'group1',
      put: false,
    },
  };

  list2Options: SortablejsOptions = {
    group: {
      name: 'group2',
      put: ['group1', 'group2'],
    },
  };

  list3Options: SortablejsOptions = {
    group: {
      name: 'group2',
      pull: 'clone',
      put: ['group1', 'group2'],
      revertClone: true,
    },
  };

  list4Options: SortablejsOptions = {
    group: {
      name: 'group2',
      put: ['group1'],
    },
  };

}
