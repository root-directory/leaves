import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Plant } from '../types/plant';
import { JournalEntry } from '../types/journalEntry';
import * as fromRoot from '../../Rx/rx.index';

import { Store, select } from '@ngrx/store';
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

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch({type: '[Journal] Load Journal', payload: this.id});
    this.journalEntries$ = this.store.select(state => state.plants.journal);
   
  }

  getPlant(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.store
      .select(selectors.getItemById(id))
      .subscribe((plant) => (this.plant = plant));
  }

  goBack(): void {
    this.location.back();
  }
}
