import * as fromPlant from './plants.actions';
import { Plant } from 'src/app/types/plant';

describe('loadPlants', () => {
  const mockPlants: Plant[]  = [
    {
      care: {
        soil: {
          last: '',
          notes: '',
          type: '3'
        },
        sunlight: {
          direction: '',
          duration: '',
          notes: 'sf'
        },
        watering: {
          frequency: '2',
          last: '',
          notes: 'fsed'
        }
      },
      id: '5ed2aecbbe7270109dad3dd6',
      imageURL: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557179245-the-sill-houseplant-zz-plant-1-6-014-2230x-progressive-1557179231.jpg',
      plantName: 'Phineas',
      plantType: 'Common Fern',
      userId: '5ed2a8ad338bcf64692b07ac'
    }
  ]
  const mockPlant:Plant = mockPlants[0]
  it('load plants action', () => {
    expect(fromPlant.loadPlants().type).toBe('[Plants] Load Plants');
  });
  it('load plants success', () => {
    expect(fromPlant.loadPlantsSuccess({payload:{plants:mockPlants}}).type).toBe('[Plants] Load Plants Success');
  });
  it('load plants fail', () => {
    expect(fromPlant.loadPlantsFail({payload:mockPlants}).type).toBe('[Plants] Load Plants Fail');
  });
  it('delete plants action', () => {
    expect(fromPlant.deletePlant({plant:mockPlant}).type).toBe('[Plants] Delete Plants');
  });
  it('delete plants success', () => {
    expect(fromPlant.deletePlantSuccess({plant:mockPlant}).type).toBe('[Plants] Delete Plants Success');
  });
  it('delete plants fail', () => {
    expect(fromPlant.deletePlantFail({error:'this'}).type).toBe('[Plants] Delete Plants Fail');
  });
});
