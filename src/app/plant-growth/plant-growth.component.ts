import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';

@Component({
  selector: 'app-plant-growth',
  templateUrl: './plant-growth.component.html',
  styleUrls: ['./plant-growth.component.scss']
})
export class PlantGrowthComponent implements OnInit {
  plant: Plant;
  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPlant();
  }

  getPlant(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.plantService.getPlant(id)
      .subscribe(plant => this.plant = plant);
  }

  goBack(): void {
    this.location.back();
  }
}
