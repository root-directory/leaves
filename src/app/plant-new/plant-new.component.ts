import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-plant-new',
  templateUrl: './plant-new.component.html',
  styleUrls: ['./plant-new.component.scss'],

})
export class PlantNewComponent implements OnInit {
  plants: Plant[];
  selectedFile:File =null;
  constructor(private plantService: PlantService, private http: HttpClient) {}

  ngOnInit() {
    this.getPlants();
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

  onFileSelected(event){
    console.log(event)
    this.selectedFile = <File>event.target.files[0];
  }
  
  onUpload() {
    const fd = new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name)
    this.http.post('api/plants',fd).subscribe(res => console.log(res));
  }

}
