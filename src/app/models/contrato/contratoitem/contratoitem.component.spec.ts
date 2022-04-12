import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoitemComponent } from './contratoitem.component';

describe('ContratoitemComponent', () => {
  let component: ContratoitemComponent;
  let fixture: ComponentFixture<ContratoitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
