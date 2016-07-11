import { SortableDirective } from './src/sortable.directive';
import { SortablejsConfigurationObject } from './index.d';

let SORTABLEJS_DIRECTIVES = [
  SortableDirective
];

let SortablejsConfiguration: SortablejsConfigurationObject = {
  defaults: {}
};

export { SortablejsConfiguration, SORTABLEJS_DIRECTIVES };
