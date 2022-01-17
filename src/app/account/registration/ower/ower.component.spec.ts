import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwerComponent } from './ower.component';

describe('OwerComponent', () => {
  let component: OwerComponent;
  let fixture: ComponentFixture<OwerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
