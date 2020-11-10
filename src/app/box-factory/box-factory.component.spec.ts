import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxFactoryComponent } from './box-factory.component';

describe('BoxFactoryComponent', () => {
  let component: BoxFactoryComponent;
  let fixture: ComponentFixture<BoxFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
