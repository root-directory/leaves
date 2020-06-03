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

@Component({
  selector: 'app-plant-growth',
  templateUrl: './plant-growth.component.html',
  styleUrls: ['./plant-growth.component.scss']
})
export class PlantGrowthComponent implements OnInit {
  plant: Plant;
  journalEntries$: Observable<JournalEntry[]>;
  id: string;
  

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
    this.titleService.setTitle('My growth');
  }

  getPlant(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.plantService.getPlant(id)
      .subscribe(plant => this.plant = plant);
  }

  goBack(): void {
    this.location.back();
  }
}
