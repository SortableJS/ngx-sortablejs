import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortableFormArrayComponent } from './sortable-form-array.component';

describe('SortableFormArrayComponent', () => {
  let component: SortableFormArrayComponent;
  let fixture: ComponentFixture<SortableFormArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SortableFormArrayComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
