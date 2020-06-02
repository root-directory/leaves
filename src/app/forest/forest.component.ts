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

  constructor(private plantService: PlantService, private store: Store<fromRoot.State>, private titleService: TitleService) {
    this.plants$ = this.store.select(state => state.plants.entities);
  }

  ngOnInit() {
    this.store.dispatch({ type: '[Plants] Load Plants' });
    // this.getPlants();
    this.titleService.setTitle('My Forest');
  }

  delete(plant: Plant): void {
    console.log('forest', plant);
    // this.plants$ = this.plants$.filter(h => h !== plant);
    this.store.dispatch(PlantActions.deletePlant({ plant }));
    // this.plantService.deletePlant(plant)
  }
}
