import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantGrowthComponent } from './plant-growth.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantService } from 'src/services/plant.service';
import { PlantServiceMock } from 'src/services/plant.service.mock';

describe('PlantGrowthComponent', () => {
  let component: PlantGrowthComponent;
  let fixture: ComponentFixture<PlantGrowthComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ PlantGrowthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: '', component: PlantGrowthComponent}
      ])],
      providers: [
        {provide: PlantService, useClass: PlantServiceMock},
        { useValue: {menu: [{label: 'care', path: '/forest/1/plant-growth'}]} }
    ]
    });
    fixture = TestBed.createComponent(PlantGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
