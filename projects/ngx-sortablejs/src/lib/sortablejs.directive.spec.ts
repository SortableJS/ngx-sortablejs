import {Component} from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {SortablejsModule} from './sortablejs.module';

describe('SortablejsDirective', () => {
  @Component({
    template: `
      <div [sortablejs]="items">
        <div *ngFor="let item of items">{{item}}</div>
      </div>
    `,
  })
  // eslint-disable-next-line @angular-eslint/component-class-suffix
  class TestComponent1 {
    items = [1, 2, 3, 4, 5];
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent1,
      ],
      imports: [
        SortablejsModule,
      ],
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(TestComponent1);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
