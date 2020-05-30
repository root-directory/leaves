import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Plant } from '../app/types/plant';

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
        plantImgs: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150']
      },
      {
        id: 2,
        name: 'Pliskin',
        plantType: 'Snake',
        imgUrl: 'https://via.placeholder.com/150',
        plantImgs: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150']
      },
      {
        id: 3,
        name: 'Nemo',
        plantType: 'Goldfish',
        imgUrl: 'https://via.placeholder.com/150',
        plantImgs: ['https://via.placeholder.com/150']
      },
      {
        id: 4,
        name: 'Hugo',
        plantType: 'Spider',
        imgUrl: 'https://via.placeholder.com/150',
        plantImgs: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150']
      },
    ];
    return {plants};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(plants: Plant[]): number {
    return plants.length > 0 ? Math.max(...plants.map(plant => plant.id)) + 1 : 11;
  }
}
