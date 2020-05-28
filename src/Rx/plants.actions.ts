import { createAction,props } from '@ngrx/store';
import { Plant } from '../app/types/plant';

export const loadPlants = createAction('[Plants] Load Plants');
export const loadPlantsFail = createAction('[Plants] Load Plants Fail',props<{payload:Plant[]}>())
export const loadPlantsSuccess = createAction('[Plants] Load Plants Success',props<{payload:Plant[]}>())



