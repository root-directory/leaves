import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PlantGrowthComponent } from './plant-growth.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantService } from 'src/services/plant.service';
import { PlantServiceMock } from 'src/services/plant.service.mock';
import { Store } from '@ngrx/store';
import { TestStore } from 'src/Rx/testStore';
import {PlantsState} from '../../Rx/plants.reducer';

describe('PlantGrowthComponent', () => {
  let component: PlantGrowthComponent;
  let fixture: ComponentFixture<PlantGrowthComponent>;
  let store: TestStore<PlantsState>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: '', component: PlantGrowthComponent}
      ])],
      providers: [
        {provide: PlantService, useClass: PlantServiceMock},
        { provide: Store, useClass: TestStore },
        { useValue: {menu: [{label: 'care', path: '/forest/1/plant-growth'}]} }
    ]
    }).compileComponents();


  }));
  beforeEach(inject([Store], (testStore: TestStore<PlantsState>) => {
    fixture = TestBed.createComponent(PlantGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = testStore;
                           // save store reference for use in tests
    store.setState({
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
            id: '5ed2aecbbe7270109dad3dd6',
            imageURL: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557179245-the-sill-houseplant-zz-plant-1-6-014-2230x-progressive-1557179231.jpg',
            plantName: 'Phineas',
            plantType: 'Common Fern',
            userId: '5ed2a8ad338bcf64692b07ac'
          }
        ],
        loaded: true,
        loading: false,
        journal: []
      },
   ); // set default state


  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
