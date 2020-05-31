import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, mergeAll } from 'rxjs/operators';

import { PlantService } from '../services/plant.service';
import { Plant } from '../app/types/plant';
import { plantsFeatureKey } from './plants.reducer';
import { deletePlantSuccess, deletePlantFail } from './plants.actions';
import * as PlantActions from '../Rx/plants.actions';
import { Journal } from 'src/app/types/journalEntry';

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
            map((plants: Plant[]) => ({
              type: '[Plants] Load Plants Success',
              payload: plants,
            })),
            catchError(() => of({type: '[Plants] Load Plants Fail'}))
          );
        }
      )
    )
  );
  loadJournal$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Journal] Load Journal'),
      mergeMap(({payload}) =>
        {
          console.log('journalAction', payload);
          return this.service.getJournal(payload).pipe(
            map((journal: Journal) => ({
              type: '[Journal] Load Journal Success',
              payload: journal,
            })),
            catchError(() => of({type: '[Journal] Load Journal Fail'}))
          );
        }
      )
    )
  );
  deletePlant$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Plants] Delete Plants'),
      mergeMap(action => {
        console.log('deletePlantAction', action);
        return this.service.deletePlant(action).pipe(
          map(() => {console.log('dataPlantAction', action); return deletePlantSuccess({plant: action}); }),

        );
      })
    )
  );


}
