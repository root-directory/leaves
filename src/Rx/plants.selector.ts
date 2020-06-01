
import { createSelector } from '@ngrx/store';

export const selectItems = (state) => state.plants.entities
export const getItemById = (id) => createSelector(selectItems, (allItems) => {
  if (allItems) {
    console.log('selector items:',allItems)
    console.log('selector id:',id)
    return allItems.find(item => {
      return item.id === id;
    });
  } else {
    console.log('selector')
    return [];
  }
});