import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CareFormComponent } from './care-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlantService } from 'src/services/plant.service';
import { PlantServiceMock } from 'src/services/plant.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TestStore } from 'src/Rx/testStore';
import {PlantsState} from '../../Rx/plants.reducer';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as selectors from '../../Rx/plants.selector';

describe('CareFormComponent', () => {
  let component: CareFormComponent;
  let fixture: ComponentFixture<CareFormComponent>;
  let store: MockStore<{plants:PlantsState}>
  const initialState = {plants:{
    entities: [
      {
        care: {
          soil: {
            last: '',
            notes: '',
            type: '3'
          },
          sunlight: {
            direction: '',
            duration: '',
            notes: 'sf'
          },
          watering: {
            frequency: '2',
            last: '',
            notes: 'fsed'
          }
        },
        id: '42',
        imageURL: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557179245-the-sill-houseplant-zz-plant-1-6-014-2230x-progressive-1557179231.jpg',
        plantName: 'Phineas',
        plantType: 'Common Fern',
        userId: '5ed2a8ad338bcf64692b07ac'
      }
    ],
    loaded: true,
    loading: false,
    journal: []
  }}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CareFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'care',
            component: CareFormComponent,
          },
        ]),
      ],
      providers: [
        { provide: PlantService, useClass: PlantServiceMock },
        provideMockStore({initialState}),

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
    fixture = TestBed.createComponent(CareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // save store reference for use in tests
    store = TestBed.get(Store)
    fixture.detectChanges();
  });

   it('should create', () => {
     spyOn(store,'select')
    //  component.plant = initialState.plants.entities[0];
     expect(component).toBeTruthy();
   });
});
  