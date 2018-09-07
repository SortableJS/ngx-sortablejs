export interface SortableEvent extends Event {
    oldIndex: number;
    newIndex: number;
    item: HTMLElement;
    clone: HTMLElement
}
