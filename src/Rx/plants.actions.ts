import { createAction, props } from '@ngrx/store';
import { Plant } from '../app/types/plant';

export const loadPlants = createAction('[Plants] Load Plants');
export const loadPlantsFail = createAction(
  '[Plants] Load Plants Fail',
  props<{ error: any }>()
);
export const loadPlantsSuccess = createAction(
  '[Plants] Load Plants Success',
  props<{ payload: {plants:Plant[]} }>()
);
export const deletePlant = createAction(
  '[Plants] Delete Plants',
  props<{ plant: Plant }>()
);
export const deletePlantFail = createAction(
  '[Plants] Delete Plants Fail',
  props<{ error: any }>()
);
export const deletePlantSuccess = createAction(
  '[Plants] Delete Plants Success',
  props<{ plant: Plant }>()
);
