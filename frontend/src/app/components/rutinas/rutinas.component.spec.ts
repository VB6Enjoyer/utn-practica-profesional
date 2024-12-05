import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinasComponent } from './rutinas.component';

describe('RutinaComponent', () => {
  let component: RutinasComponent;
  let fixture: ComponentFixture<RutinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinasComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
