import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-plant-upload',
  templateUrl: './plant-upload.component.html',
  styleUrls: ['./plant-upload.component.scss']
})
export class PlantUploadComponent implements OnInit {
  plants: Plant[];

  constructor(private plantService: PlantService, private titleService: TitleService) { }

  ngOnInit() {
    this.getPlants();

    this.titleService.setTitle('New photo of me');
  }

  getPlants(): void {
    this.plantService.getPlants().subscribe((plants) => (this.plants = plants));
  }

  add(name: string, imgUrl: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    imgUrl = imgUrl.trim();
    if (!imgUrl) {
      return;
    }
    this.plantService.addPlant({ name, imgUrl } as Plant).subscribe((plant) => {
      this.plants.push(plant);
    });
  }
}
