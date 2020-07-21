import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareFormComponent } from './care-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlantService } from 'src/services/plant.service';
import { PlantServiceMock } from 'src/services/plant.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PlantsState } from '../../Rx/plants.reducer';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

describe('CareFormComponent', () => {
  let component: CareFormComponent;
  let fixture: ComponentFixture<CareFormComponent>;
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
    fixture = TestBed.createComponent(CareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  xit('should be able to call onSubmit', () => {
    const mockForm = {
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
    };

    const hostElement = fixture.nativeElement;
    const notesInput: HTMLInputElement = hostElement.querySelector('input');
    const e: Event = document.createEvent('Event');
    e.initEvent('input', false, false);
    notesInput.value = 'damp soil';
    const spy = spyOn(component, 'onSubmit');
    // component.onUpload()
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(spy).toHaveBeenCalled();
    // expect(spy).toHaveBeenCalledWith(mockForm, '42');
  });
});
