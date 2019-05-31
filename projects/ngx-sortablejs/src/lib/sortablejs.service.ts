import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortablejsService {

  // original library calls the events in unnatural order
  // first the item is added, then removed from the previous array
  // this is a temporary event to work this around
  // as long as only one sortable takes place at a certain time
  // this is enough to have a single `global` event
  transfer: (items: any[]) => void;

}
