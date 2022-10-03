import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTabComponent } from './test-tab.component';

describe('TestTabComponent', () => {
  let component: TestTabComponent;
  let fixture: ComponentFixture<TestTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
