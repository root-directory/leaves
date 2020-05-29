import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PlantService } from '../plant.service';
import { Plant } from '../plant';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-plant-care',
  templateUrl: './plant-care.component.html',
  styleUrls: ['./plant-care.component.scss']
})
export class PlantCareComponent implements OnInit {

  plant: Plant;
  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private location: Location,
  ) { }


  ngOnInit(): void {
    this.getPlant();
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


