import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';
import { HttpClient } from '@angular/common/http';
import { TitleService } from '../title.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plant-new',
  templateUrl: './plant-new.component.html',
  styleUrls: ['./plant-new.component.scss'],
})
export class PlantNewComponent implements OnInit {
  plants: Plant[];

  selectedFile: File = null;

  uploadForm: FormGroup;

  name: string = null;

  constructor(private plantService: PlantService, private http: HttpClient, private titleService: TitleService, private formBuilder: FormBuilder) { }



  ngOnInit() {
    this.titleService.setTitle('New member of the forest');
    this.uploadForm = this.formBuilder.group({
      name: [''],
      image: [null],
    });
  }

  onFileSelected(event) {
    this.selectedFile = (event.target.files[0] as File);
    console.log(this.selectedFile);
  }

  onUpload() {
    this.uploadForm.patchValue({
      image: this.selectedFile,
    });
    this.plantService.addPlant(this.uploadForm.value).subscribe((plant) => {
      console.log(plant);
    });
  }
}
