import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';
import { JournalEntry } from '../types/journalEntry';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../Rx/rx.index';
import { TitleService } from '../title.service';
import * as selectors from '../../Rx/plants.selector';

@Component({
  selector: 'app-plant-growth',
  templateUrl: './plant-growth.component.html',
  styleUrls: ['./plant-growth.component.scss'],
})
export class PlantGrowthComponent implements OnInit {
  plant: Plant;
  journalEntries$: Observable<JournalEntry[]>;
  id: string;
  lastWateredEntry;
  journalTest;
  timeSinceWatered;
  alert;
  color: string;
  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private location: Location,
    private router: Router,
    private store: Store<fromRoot.State>,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch({ type: '[Journal] Load Journal', payload: this.id });
    this.journalEntries$ = this.store.select(
      (state) => state.plants.journal.journalEntries
    );
    this.store
      .select((state) => state.plants.journal.journalEntries)
      .subscribe((res) => {
        this.lastWateredEntry = res;
      });

    this.getPlant();
    this.lastWatered();
    this.titleService.setTitle('My growth');
  }

  getPlant(): void {
    this.store
      .select(selectors.getItemById(this.id))
      .subscribe((plant) => (this.plant = plant));

  }

  lastWatered() {
    const dates: number = Date.now() - parseInt(this.plant.lastWatered, 10);
    const daysDiff: number = Math.floor(dates / (1000 * 60 * 60 * 24));
    const wateringFrequencyDays: number =
      parseInt(this.plant.care.watering.frequency, 10) * 7;
    if (!wateringFrequencyDays) {
    this.alert = {
      title: `No watering events in your journal!`,
      lastWatered: `Add a new Journal Event`,
      daysUntil: `and be sure to update your plant care with intervals`,
    };
    this.color = 'green';
    }
    else if (daysDiff > wateringFrequencyDays) {

      this.alert = {
        title: `Your Plant is Thirsty!`,
        lastWatered: `Last Watered:${daysDiff} days ago. `,
        daysUntil: ` Past Due by: ${daysDiff - wateringFrequencyDays}days!`,
      };
      this.color = 'red';
    } else {
      console.log(wateringFrequencyDays);
      this.alert = {
        title: `Nice Watering!`,
        lastWatered: `Last Watered:${daysDiff} days ago. `,
        daysUntil: ` ${
          wateringFrequencyDays - daysDiff
        }days, until you need to water this plant!`,
      };
      this.color = 'green';
    }
    this.timeSinceWatered = daysDiff;
  }

  goBack(): void {
    this.router.navigate(['/forest', this.id, 'plant-overview']);
  }

}
