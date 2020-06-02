import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalFormComponent } from './journal-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlantService } from 'src/services/plant.service';
import { PlantServiceMock } from 'src/services/plant.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('JournalFormComponent', () => {
  let component: JournalFormComponent;
  let fixture: ComponentFixture<JournalFormComponent>;
  // let service: PlantServiceMock

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'journal',
            component: JournalFormComponent,
          },
        ]),
      ],
      providers: [
        { provide: PlantService, useClass: PlantServiceMock },

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
    fixture = TestBed.createComponent(JournalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });
  it('should contain Type of Journal Event', () => {
    const titleElement: HTMLElement = fixture.nativeElement;
    expect(titleElement.textContent).toContain('Type of Journal Event');
  });
  it('should contain Type of Journal Entry Type', () => {
    const titleElement: HTMLElement = fixture.nativeElement;
    expect(titleElement.textContent).toContain('Journal Entry Type:');
  });
  it('should contain A list of optional Event Types:', () => {
    const titleElement: HTMLElement = fixture.nativeElement;
    expect(titleElement.textContent).toContain('Watering');
    expect(titleElement.textContent).toContain('Image');
    expect(titleElement.textContent).toContain('Repotting');
    expect(titleElement.textContent).toContain('Location');
  });

  it('should contain a submit button', () => {
    const titleElement: HTMLElement = fixture.nativeElement;
    expect(titleElement.textContent).toContain('Submit');
  });
  it('should be able to call onUpload', () => {
    const hostElement = fixture.nativeElement;
    const notesInput: HTMLInputElement = hostElement.querySelector('input');
    notesInput.value = 'quick BROWN fOx';
    const spy = spyOn(component, 'onUpload');
    // component.onUpload()
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(spy).toHaveBeenCalled();
  });
  it('should not submit an image url when there are no images selected', () => {

    const hostElement = fixture.nativeElement;
    const notesInput: HTMLInputElement = hostElement.querySelector('input');
    notesInput.value = 'quick BROWN fOx';

    const spy = spyOn(component.service, 'uploadImage');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(spy).not.toHaveBeenCalled();
  });
  it('should not submit an image url when there are no images selected', () => {
    const mockForm = {
      eventType: '',
      info: {
        notes: 'Walaalala',
        imgUrl: ''
      }
    };

    const hostElement = fixture.nativeElement;
    const notesInput: HTMLInputElement = hostElement.querySelector('input');
    const e: Event = document.createEvent('Event');
    e.initEvent('input', false, false);
    notesInput.value = 'Walaalala';
    notesInput.dispatchEvent(e);
    fixture.detectChanges();

    const spy = spyOn(component.service, 'addJournalEntry');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(spy).toHaveBeenCalledWith(mockForm, '42');

    // fixture.whenStable().then(() => expect(something).toEqual('something'));
  });


});
