import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plant-new',
  templateUrl: './plant-new.component.html',
  styleUrls: ['./plant-new.component.scss'],
})
export class PlantNewComponent implements OnInit {
  constructor(
    private plantService: PlantService,
    private formBuilder: FormBuilder
  ) {}

  uploadForm: FormGroup;

  selectedFile: File = null;
  name: string = null;

  ngOnInit() {
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
