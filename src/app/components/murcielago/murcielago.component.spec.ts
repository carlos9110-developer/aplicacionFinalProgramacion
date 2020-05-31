import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MurcielagoComponent } from './murcielago.component';

describe('MurcielagoComponent', () => {
  let component: MurcielagoComponent;
  let fixture: ComponentFixture<MurcielagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MurcielagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MurcielagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
