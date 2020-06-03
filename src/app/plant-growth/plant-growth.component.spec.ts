import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { PlantService } from 'src/services/plant.service';
import { PlantServiceMock } from 'src/services/plant.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PlantsState } from '../../Rx/plants.reducer';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { PlantGrowthComponent } from './plant-growth.component';

describe('PlantGrowthComponent', () => {
  let component: PlantGrowthComponent;
  let fixture: ComponentFixture<PlantGrowthComponent>;
  const initialState = {
    plants: {
      entities: [
        {
          care: {
            soil: {
              last: '',
              notes: 'Soil Test Notes',
              type: '3',
            },
            sunlight: {
              direction: 'West',
              duration: '1',
              notes: 'Sunlight Test Notes',
            },
            watering: {
              frequency: '1',
              last: '',
              notes: 'Watering Test Notes',
            },
          },
          id: '42',
          imageURL: 'https://fake/url',
          plantName: 'Phineas',
          plantType: 'Common Fern',
          userId: '5ed2a8ad338bcf64692b07ac',
        },
      ],
      loaded: true,
      loading: false,
      journal: [],
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlantGrowthComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'growth',
            component: PlantGrowthComponent,
          },
        ]),
      ],
      providers: [
        { provide: PlantService, useClass: PlantServiceMock },
        provideMockStore({ initialState }),
        { provide: ComponentFixtureAutoDetect, useValue: true },

        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '42',
              },
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
