import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SortablejsModule } from 'ngx-sortablejs';
import { ChildComponentComponent } from './child-component/child-component.component';
import { CrossComponentsMultipleListsComponent } from './cross-components-multiple-lists.component';

describe('CrossComponentsMultipleListsComponent', () => {
  let component: CrossComponentsMultipleListsComponent;
  let fixture: ComponentFixture<CrossComponentsMultipleListsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CrossComponentsMultipleListsComponent,
        ChildComponentComponent,
      ],
      imports: [
        SortablejsModule,
      ],
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
