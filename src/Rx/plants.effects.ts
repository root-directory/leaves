import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { PlantService } from '../services/plant.service'
import { Plant } from '../app/types/plant';

@Injectable()
export class PlantEffects {
  constructor(
    private actions$: Actions,
    private service: PlantService
  ) {}

  loadPlants$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Plants] Load Plants'),
      mergeMap(() =>
        {
        return this.service.getPlants().pipe(
            map((plants:Plant[]) => ({
              type: '[Plants] Load Plants Success',
              payload: plants,
            })),
            catchError(() => of({type:'[Plants] Load Plants Fail'}))
          )
        }
      )
    )
  );


}
