import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Plant } from '../types/plant';

import { Store, select } from '@ngrx/store';
import * as selectors from '../../Rx/plants.selector';

@Component({
  selector: 'app-plant-growth',
  templateUrl: './plant-growth.component.html',
  styleUrls: ['./plant-growth.component.scss'],
})
export class PlantGrowthComponent implements OnInit {
  plant: Plant;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<{ plants: Plant[] }>
  ) {}

  ngOnInit(): void {
    this.getPlant();
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
