import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PlantService } from './plant.service';
import { Plant } from 'src/app/types/plant';

describe('PlantService', () => {
  let service: PlantService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlantService],
    });
    injector = getTestBed();
    service = injector.get(PlantService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const dummyPlantsResponse: Plant[] = [
    {
      care: {
        soil: {
          last: '',
          notes: 'Entering in this now',
          type: 'dirt',
        },
        sunlight: {
          direction: 'North',
          duration: '5',
          notes: 'Should have indirect light,but alot of it',
        },
        watering: {
          frequency: '2',
          last: '',
          notes: 'Seems like I need to water it more frequently',
        },
      },
      id: '5ed954a9aaf5e41706648ad7',
      imageURL:
        'https://cassie-test-bucket123.s3-us-west-1.amazonaws.com/1591301288535628.jpg',
      lastWatered: '1593366219485',
      plantName: 'Fred',
      plantType: 'Hosta',
      userId: '5ed2a8ad338bcf64692b07ac',
    },
  ];
  const dummyPlantsModified: Plant[] = [
    {
      care: {
        soil: {
          last: '',
          notes: 'Entering in this now',
          type: 'dirt',
        },
        sunlight: {
          direction: 'North',
          duration: '5',
          notes: 'Should have indirect light,but alot of it',
        },
        watering: {
          frequency: '2',
          last: '',
          notes: 'Seems like I need to water it more frequently',
        },
      },
      id: '5ed954a9aaf5e41706648ad7',
      imageURL:
        'https://cassie-test-bucket123.s3-us-west-1.amazonaws.com/1591301288535628.jpg',
      lastWatered: '1593366219485',
      plantName: 'Fred',
      plantType: 'Hosta',
      userId: '5ed2a8ad338bcf64692b07ac',
      alert: {
        title: 'Your Plant is Thirsty!',
        lastWatered: 'Last Watered:22 days ago. ',
        daysUntil: ' Past Due by: 8days!',
        color: 'red',
      },
    },
  ];

  it('getPlants() should return data', () => {
    service.getPlants().subscribe((res) => {
      expect(res).toEqual(dummyPlantsResponse);
    });

    const req = httpMock.expectOne(`${service.ROOT_URL + service.PLANTS_URL}`);
    console.log(req);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPlantsResponse);
  });
  it('addWateringAlert() should return modified data', () => {
    let returnedVal = service.addWateringAlert(dummyPlantsResponse);
    expect(returnedVal).toEqual(dummyPlantsModified);
  });
});
