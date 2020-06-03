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

describe('CareFormComponent', () => {
  let component: CareFormComponent;
  let fixture: ComponentFixture<CareFormComponent>;
  let store: TestStore<PlantsState>

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
        { provide: Store, useClass: TestStore },

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

  beforeEach(inject([Store], (testStore: TestStore<PlantsState>) => {
    fixture = TestBed.createComponent(CareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = testStore;
                           // save store reference for use in tests
    store.setState({
        entities: [
          {
            care: {
              soil: {
                type: '3',
                last: '',
                notes: ''
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

   it('should create', () => {
     expect(component).toBeTruthy();
     expect(component).toBeDefined();
   });

   it('should contain Type of Care Event', () => {
    const titleElement: HTMLElement = fixture.nativeElement;
    expect(titleElement.textContent).toContain('Watering');
  });

  it('should contain Type of Care Entry Type', () => {
    const titleElement: HTMLElement = fixture.nativeElement;
    expect(titleElement.textContent).toContain('Notes:');
  });

  it('should contain a submit button', () => {
    const titleElement: HTMLElement = fixture.nativeElement;
    expect(titleElement.textContent).toContain('Submit');
  });

  it('should be able to call onSubmit', () => {
    const hostElement = fixture.nativeElement;
    const notesInput: HTMLInputElement = hostElement.querySelector('input');
    notesInput.value = 'damp soil';
    const spy = spyOn(component, 'onSubmit');
    // component.onUpload()
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(spy).toHaveBeenCalled();
  });
});
  
