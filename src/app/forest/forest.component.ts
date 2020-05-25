import { Component, OnInit } from '@angular/core';
import {PLANTS} from '../mock-plants';
import { PlantService } from '../plant.service';
import { Plant } from '../plant';



@Component({
  selector: 'app-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.scss']
})
export class ForestComponent implements OnInit {
  plants: Plant[];
  constructor(private plantService: PlantService) { }

  ngOnInit() {
    this.getPlants();
  }

  getPlants(): void {
    this.plantService.getPlants().subscribe(plants => this.plants = plants);
  }

}
