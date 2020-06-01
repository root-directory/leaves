import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Plant } from '../app/types/plant';
import { JournalEntry } from '../app/types/journalEntry';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const plants = [
      {
        id: 1,
        name: 'Mater',
        plantType: 'Tomato',
        imgUrl: 'https://via.placeholder.com/150',
        plantImgs: [
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
        ],
      },
      {
        id: 2,
        name: 'Pliskin',
        plantType: 'Snake',
        imgUrl: 'https://via.placeholder.com/150',
        plantImgs: [
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
        ],
      },
      {
        id: 3,
        name: 'Nemo',
        plantType: 'Goldfish',
        imgUrl: 'https://via.placeholder.com/150',
        plantImgs: ['https://via.placeholder.com/150'],
      },
      {
        id: 4,
        name: 'Hugo',
        plantType: 'Spider',
        imgUrl: 'https://via.placeholder.com/150',
        plantImgs: [
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
        ],
      },
    ];

    const journals = [
      {
        id: 1,
        journalEntries: [
          {
            id: 2,
            plantID: '98fdE38FDfe238',
            eventType: 'image',
            timestamp: '2020-05-28T20:22:51.215Z',
            info: {
              imgUrl: 'https://via.placeholder.com/150',
              notes:
                'Phineas seems to be enjoying the extra sunlight in his new spot!',
            },
          },
          {
            id: 5,
            plantID: '98fdE38FDfe238',
            eventType: 'water',
            timestamp: '2020-05-28T20:22:51.215Z',
            info: {
              notes:
                'Only gave Phineas half as much water as usual today, since his soil still looked very damp.',
            },
          },
        ],
      },
    ];

    return { plants, journals };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId<T extends Plant | JournalEntry>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map((t) => t.id)) + 1 : 11;
  }
}
