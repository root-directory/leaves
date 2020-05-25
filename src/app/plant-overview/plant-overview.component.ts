import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlantService } from '../plant.service';
import { Plant } from '../plant';

@Component({
  selector: 'app-plant-overview',
  templateUrl: './plant-overview.component.html',
  styleUrls: ['./plant-overview.component.scss']
})
export class PlantOverviewComponent implements OnInit {
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
    const id = +this.route.snapshot.paramMap.get('id');
    this.plantService.getPlant(id)
      .subscribe(plant => this.plant = plant);
  }

}
