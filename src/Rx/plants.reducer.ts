import {  createReducer, on } from '@ngrx/store';
import { Plant } from '../app/types/plant';
import * as PlantActions from './plants.actions';
import { Journal } from 'src/app/types/journalEntry';

const initialState: PlantsState = {
  entities: [],
  loaded: false,
  loading: false,
  journal: [],
};
export const plantsFeatureKey = 'plants';
export const reducer = createReducer(
initialState,
  on(PlantActions.loadPlants, (state) => state),
  on(PlantActions.loadPlantsSuccess, (state: PlantsState, { payload}) => {
    console.log('LoadPlantReducer:', payload);
    const entities = payload.plants;
    return {
      ...state,
      loading: false,
      loaded: true,
      entities
    };
  }),
  on(PlantActions.loadJournal, (state) => state),
  on(PlantActions.loadJournalSuccess, (state: PlantsState, { payload }) => {
    const journal = payload;
    return {
      ...state,
      journal
    };
  }),
  on(PlantActions.deletePlant, (state: PlantsState, {plant}) => {
    const id = plant.id;
    const entities = state.entities.filter(entity => entity.id !== id);
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
    const entities = state.entities.filter(entity => entity.id !== id);
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
  journal: any;
}

