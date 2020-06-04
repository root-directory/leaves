import { createSelector } from '@ngrx/store';

export const selectItems = (state) => state.plants.entities;
export const getItemById = (id) => createSelector(selectItems, (allItems) => {
  if (allItems) {
    return allItems.find(item => {
      return item.id === id;
    });
  } else {
    return [];
  }
});
