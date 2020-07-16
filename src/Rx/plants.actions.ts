import { createAction, props } from '@ngrx/store';
import { Plant } from '../app/types/plant';
import { JournalEntry, Journal } from 'src/app/types/journalEntry';

export const loadPlants = createAction('[Plants] Load Plants');
export const loadPlantsFail = createAction(
  '[Plants] Load Plants Fail',
  props<{ payload: Plant[] }>()
);
export const loadPlantsSuccess = createAction(
  '[Plants] Load Plants Success',
  props<{ payload: Plant[]  }>()
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
export const loadJournal = createAction(
  '[Journal] Load Journal',
  props<{ plantId: string }>()
);
export const loadJournalFail = createAction(
  '[Journal] Load Journal Fail',
  props<{ payload: Journal }>()
);
export const loadJournalSuccess = createAction(
  '[Journal] Load Journal Success',
  props<{ payload: Journal }>()
);
export const addJournalEntry = createAction(
  '[JournalEntry] Add JournalEntry',
  props<{ payload: JournalEntry }>()
);
export const updateCare = createAction(
  '[Care] Update Care',
  props<{ plant: Plant }>()
);
export const addJournalEntryFail = createAction(
  '[JournalEntry] Add JournalEntry Fail',
  props<{ error: any }>()
);
export const addJournalEntrySuccess = createAction(
  '[JournalEntry] Add JournalEntry Success',
  props<{ payload: JournalEntry }>()
);
