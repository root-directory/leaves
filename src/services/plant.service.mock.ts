import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable()
export class PlantServiceMock {
  constructor() {}

  getPlants() {
    return [
      {
        care: {
          notes:
            'I\'m upset that you don\'t have pH so... I guess I\'ll write it here.',
          soil: {
            last: '2020-05-28T20:22:51.215Z',
            notes: 'Sand is best for this type',
            type: 'sand',
          },
          sunlight: {
            direction: 'west',
            duration: 8,
            notes: 'Second floor bedroom window works best',
          },
          watering: {
            frequency: 7,
            last: '2020-06-28T20:22:51.215Z',
            notes: 'Should be watered with about 8oz',
          },
        },
        id: '5ed2aecbbe7270109dad3dd6',
        imageURL:
          'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557179245-the-sill-houseplant-zz-plant-1-6-014-2230x-progressive-1557179231.jpg',
        plantName: 'Phineas',
        plantType: 'Common Fern',
        userId: '5ed2a8ad338bcf64692b07ac',
      },
    ];
  }

  uploadImage(url: string, fd: any) {

    return of('http://fake/url');
  }

  addJournalEntry() {
    return of([]);
  }
}
