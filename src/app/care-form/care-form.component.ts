import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PlantService } from '../plant.service';
import { Plant } from '../plant';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-care-form',
  templateUrl: './care-form.component.html',
  styleUrls: ['./care-form.component.scss']
})


export class CareFormComponent implements OnInit {


  SERVER_URL = 'http://localhost:4200/upload';
  uploadForm: FormGroup;

  plant: Plant;
  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private location: Location,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    ) { }


    ngOnInit(): void {
      this.getPlant();
      this.uploadForm = this.formBuilder.group({
        profile: ['']
      });
    }

    getPlant(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.plantService.getPlant(id)
      .subscribe(plant => this.plant = plant);
    }

    goBack(): void {
      this.location.back();
    }

    onFileSelect(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.uploadForm.get('profile').setValue(file);
      }
    }

    onSubmit() {
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('profile').value);

      this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
        );
      }

    }


