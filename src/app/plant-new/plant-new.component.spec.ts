import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantNewComponent } from './plant-new.component';

describe('PlantNewComponent', () => {
  let component: PlantNewComponent;
  let fixture: ComponentFixture<PlantNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
