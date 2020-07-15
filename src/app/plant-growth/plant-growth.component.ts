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
    this.titleService.setTitle('My growth');
  }

  getPlant(): void {
    this.store
      .select(selectors.getItemById(this.id))
      .subscribe((plant) => (this.plant = plant));
  }

  goBack(): void {
    this.router.navigate(['/forest', this.id, 'plant-overview']);
  }
}
