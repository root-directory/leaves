import { TestBed } from '@angular/core/testing';

import { PlantService } from './plant.service';

describe('PlantService', () => {
  let service: PlantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
