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
    return {
      ...state,
      loading: false,
      loaded: true,
      entities
    };
  }),
  on(PlantActions.deletePlant, (state: PlantsState, {plant}) => {
    const id = plant.id;
    const entities = state.entities.filter(plant => plant.id !== id);
    console.log('action plant', plant);
    return {
      ...state,
      loaded: true,
      loading: false,
      entities
    };
  }),
  on(PlantActions.deletePlantSuccess, (state: PlantsState, {plant}) => {
    console.log('reducer', plant);
    const id = plant.id;
    const entities = state.entities.filter(plant => plant.id !== id);
    console.log('action plant', plant);
    return {
      ...state,
      loaded: true,
      loading: false,
      entities
    };
  })
);

export interface PlantsState {
  entities: Plant[];
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
