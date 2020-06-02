import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantUploadComponent } from './plant-upload.component';

describe('PlantUploadComponent', () => {
  let component: PlantUploadComponent;
  let fixture: ComponentFixture<PlantUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
