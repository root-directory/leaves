import {  createReducer, on } from '@ngrx/store';
import { Plant } from '../app/types/plant';
import * as PlantActions from './plants.actions';

const initialState: PlantsState = {
  entities: [],
  loaded: false,
  loading: false,
};
export const plantsFeatureKey = 'plants';
export const reducer = createReducer(
initialState,
  on(PlantActions.loadPlants, (state) => state),
  on(PlantActions.loadPlantsSuccess, (state: PlantsState, { payload }) => {
    const entities = payload;
    console.log('action payload', payload);
    return {
      ...state,
      loading: false,
      loaded: true,
      entities
    };
  })
);

export interface PlantsState {
  entities:Plant[];
  loaded: boolean;
  loading: boolean;
}

// export function reducer( state: PlantsState = initialState, action: PlantActions.Actions): PlantsState {
//   switch (action.type) {
//     case PlantActions.LOAD_PLANTS_SUCCESS: {
//       const plants = action.payload;
//       console.log('action payload',action.payload)
//       let entities = plants
//       return {
//         ...state,
//         loading: false,
//         loaded: true,
//         entities,
//       };
//     }
//   }
//   return state;
// }
