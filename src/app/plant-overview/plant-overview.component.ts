import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';
import { TitleService } from '../title.service';
import * as PlantActions from '../../Rx/plants.actions';
import * as selectors from '../../Rx/plants.selector';

@Component({
  selector: 'app-plant-overview',
  templateUrl: './plant-overview.component.html',
  styleUrls: ['./plant-overview.component.scss']
})
export class PlantOverviewComponent implements OnInit {
  plant: Plant;
  plants$: Observable<Plant[]> = this.store.select(state => state.plants);
  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private titleService: TitleService,
    private location: Location,
    private store: Store<{ plants: Plant[] }>
  ) { }

  ngOnInit(): void {
    this.getPlant();
    this.titleService.setTitle(`${this.plant.plantName}: ${this.plant.plantType}`);
  }

  getPlant(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.store.select(selectors.getItemById(id)).subscribe((plant) => {
        this.plant = plant
    });
  }
}
