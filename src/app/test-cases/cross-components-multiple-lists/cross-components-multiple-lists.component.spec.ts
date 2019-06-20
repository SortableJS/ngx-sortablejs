import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrossComponentsMultipleListsComponent } from './cross-components-multiple-lists.component';

describe('CrossComponentsMultipleListsComponent', () => {
  let component: CrossComponentsMultipleListsComponent;
  let fixture: ComponentFixture<CrossComponentsMultipleListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrossComponentsMultipleListsComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossComponentsMultipleListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
