import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PlantService } from './plant.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Plant } from 'src/app/types/plant';

describe('PlantService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let plantService: PlantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlantService],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    plantService = TestBed.inject(PlantService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be able to retrieve plant data from an api', () => {
    const dummyPosts: Plant[] = [
      {
        id: 1,
        name: 'Jackie',
        plantType: 'Sansevaria',
        imgUrl: 'http/something/somethingelse',
        plantImgs: ['this', 'that'],
        plantWatering: 4,
        plantSoil: 'clay',
        plantSunlight: 'Lots',
        plantNotes: 'This is a cool test plant note',
      },
    ];

    plantService.getPlants().subscribe((plants) => {
      expect(plants.length).toBe(1);
      expect(plants).toEqual(dummyPosts);
    });
    const request = httpTestingController.expectOne(`${plantService.PLANTS_URL}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
  });
});
