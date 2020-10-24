import { SortablejsBinding } from './sortablejs-binding';
import {SortableData} from './sortablejs.directive';

export class SortablejsBindings {

  bindings: SortablejsBinding[];

  constructor(bindingTargets: SortableData[]) {
    this.bindings = bindingTargets.map(target => new SortablejsBinding(target));
  }

  injectIntoEvery(index: number, items: any[]) {
    this.bindings.forEach((b, i) => b.insert(index, items[i]));
  }

  getFromEvery(index: number) {
    return this.bindings.map(b => b.get(index));
  }

  extractFromEvery(index: number) {
    return this.bindings.map(b => b.remove(index));
  }

  get provided() {
    return !!this.bindings.length;
  }

}
