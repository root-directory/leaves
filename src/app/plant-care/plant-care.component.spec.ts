import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantCareComponent } from './plant-care.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';



describe('PlantCareComponent', () => {
  let component: PlantCareComponent;
  let fixture: ComponentFixture<PlantCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: '', component: PlantCareComponent}
      ])],
      providers: [{
        useValue: {menu: [{label: 'care', path: '/forest/1/plant-care'}]}
      }]
    });
    fixture = TestBed.createComponent(PlantCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
