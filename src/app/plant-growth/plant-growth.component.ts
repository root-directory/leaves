import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  styleUrls: ['./plant-growth.component.scss']
})
export class PlantGrowthComponent implements OnInit {
  plant: Plant;
  journalEntries$: Observable<JournalEntry[]>;
  id: string;
  lastWateredEntry;
  journalTest;
  timeSinceWatered;
  alert: string;
  color: string;
  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private location: Location,
    private store: Store<fromRoot.State>,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch({type: '[Journal] Load Journal', payload: this.id});
    this.journalEntries$ = this.store.select(state => state.plants.journal.journalEntries);
    this.store.select(state => state.plants.journal.journalEntries).subscribe(
      res => {this.lastWateredEntry = res; }

    );

    this.getPlant();
    this.titleService.setTitle('My growth');
  }

  getPlant(): void {
    this.store
      .select(selectors.getItemById(this.id))
      .subscribe((plant) => (this.plant = plant));
    console.log(this.plant.care.watering);
    this.lastWatered();
  }

  lastWatered(){
    let lastWateredDate = this.lastWateredEntry.filter(entry => {
      return entry.entryType === 'water';
    });
    if (lastWateredDate.length){
      lastWateredDate = lastWateredDate[lastWateredDate.length - 1].timestamp;
    }else{
      lastWateredDate = Date.now();
    }

    const dates: number = Date.now() - lastWateredDate;
    const daysDiff: number = Math.floor(dates / (1000 * 60 * 60  * 24));
    const wateringFrequencyDays: number = parseInt(this.plant.care.watering.frequency, 10) * 7;

    if (daysDiff > wateringFrequencyDays){
      this.alert = `It has been about ${daysDiff} since you watered last. Your care states you should water it every:${wateringFrequencyDays}days!`;
      this.color = 'red';
    }else{
      this.color = 'green';
      this.alert = `You have ${wateringFrequencyDays - daysDiff}days, until you need to water this plant!`;
    }
    this.timeSinceWatered = daysDiff;

  }

  goBack(): void {
    this.location.back();
  }
}
