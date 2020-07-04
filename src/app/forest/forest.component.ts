import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PlantActions from '../../Rx/plants.actions';
import * as fromRoot from '../../Rx/rx.index';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.scss'],
})
export class ForestComponent implements OnInit {
  plants$: Observable<Plant[]>;

  constructor(
    private plantService: PlantService,
    private store: Store<fromRoot.State>,
    private titleService: TitleService
  ) {
    this.plants$ = this.store.select((state) => state.plants.entities);
  }

  ngOnInit() {
    this.store.dispatch({ type: '[Plants] Load Plants' });
    this.titleService.setTitle('My Forest');
  }

  delete(plant: Plant): void {
    this.store.dispatch(PlantActions.deletePlant({ plant }));
  }

  lastWatered(plant) {
    const datesDiff = Date.now() - plant.lastWatered;
    const daysDiff = Math.floor(datesDiff / (1000 * 60 * 60 * 24));
    let alert = {
      color: 'white',
      title: '',
      lastWatered: '',
      daysUntil: '',
    };
    const wateringFrequencyDays = plant.care.watering.frequency * 7;
    console.log(wateringFrequencyDays);
    if (!wateringFrequencyDays) {
      alert = {
        title: `No watering events in your journal!`,
        lastWatered: `Add a new Journal Event`,
        daysUntil: `and be sure to update your plant care with intervals`,
        color: 'green',
      };
    } else if (daysDiff > wateringFrequencyDays) {
      alert = {
        title: `Your Plant is Thirsty!`,
        lastWatered: `Last Watered:${daysDiff} days ago. `,
        daysUntil: ` Past Due by: ${daysDiff - wateringFrequencyDays}days!`,
        color: 'red',
      };
    } else {
      alert = {
        title: `Nice Watering!`,
        lastWatered: `Last Watered:${daysDiff} days ago. `,
        daysUntil: ` ${
          wateringFrequencyDays - daysDiff
        }days, until you need to water this plant!`,
        color: 'green',
      };
    }
    return { daysSinceLastWatered: daysDiff, alert };
  }
}
