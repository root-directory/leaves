import { Component, OnInit } from '@angular/core';
import { PlantService } from '../plant.service';
import { Plant } from '../plant';

@Component({
  selector: 'app-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.scss'],
})
export class ForestComponent implements OnInit {
  plants: Plant[];
  constructor(private plantService: PlantService) {}

  ngOnInit() {
    this.getPlants();
  }

  getPlants(): void {
    this.plantService.getPlants().subscribe((plants) => (this.plants = plants));
  }

  add(name: string,imgUrl:string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    imgUrl = imgUrl.trim();
    if (!imgUrl) {
      return;
    }
    this.plantService.addPlant({ name,imgUrl } as Plant).subscribe((plant) => {
      this.plants.push(plant);
    });
  }

  delete(plant: Plant): void {
    this.plants = this.plants.filter(h => h !== plant);
    this.plantService.deletePlant(plant).subscribe();
  }


}
