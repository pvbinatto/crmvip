import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoaddComponent } from './contratoadd.component';

describe('ContratoaddComponent', () => {
  let component: ContratoaddComponent;
  let fixture: ComponentFixture<ContratoaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
