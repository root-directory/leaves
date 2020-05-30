import * as fromPlant from './plants.actions';

describe('loadPlants', () => {
  it('should return an action', () => {
    expect(fromPlant.loadPlants().type).toBe('[Plant] Load Plants');
  });
});
