import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SortablejsModule } from 'ngx-sortablejs';
import { SortableWithOptionsComponent } from './sortable-with-options.component';

describe('SortableWithOptionsComponent', () => {
  let component: SortableWithOptionsComponent;
  let fixture: ComponentFixture<SortableWithOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SortableWithOptionsComponent],
      imports: [
        SortablejsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableWithOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
