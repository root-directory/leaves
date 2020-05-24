import { Injectable } from '@angular/core';
import { Plant } from './plant';
import { PLANTS } from './mock-plants';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor() { }

  getPlants(): Observable<Plant[]> {
    return of(PLANTS);
  }

  getPlant(id: number): Observable<Plant> {
    return of (PLANTS.find(plant => plant.id === id));
  }
}
