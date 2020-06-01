import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TitleService } from '../title.service'

@Component({
  selector: 'app-care-form',
  templateUrl: './care-form.component.html',
  styleUrls: ['./care-form.component.scss']
})

export class CareFormComponent implements OnInit {
  SERVER_URL = 'https://root-directory-server.herokuapp.com/api/v1/users/5ed2a8ad338bcf64692b07ac/plants';
  uploadForm: FormGroup;

  plant: Plant;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private titleService: TitleService,
    private location: Location,
    public formBuilder: FormBuilder,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      care: this.formBuilder.group({
        watering: this.formBuilder.group({
          frequency: [''],
          last: [''],
          notes: ['']
        }),
        soil: this.formBuilder.group({
          type: [''],
          last: [''],
          notes: ['']
        }),
        sunlight: this.formBuilder.group({
          duration: [''],
          direction: [''],
          notes: ['']
        })
      })
    })

    this.getPlant();

    this.titleService.setTitle('Care Log')
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
      this.uploadForm.get('care').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('care').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}



