import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TitleService } from '../title.service'
import * as selectors from '../../Rx/plants.selector';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-care-form',
  templateUrl: './care-form.component.html',
  styleUrls: ['./care-form.component.scss']
})

export class CareFormComponent implements OnInit {
  ROOT_SERVER_URL = 'https://root-directory-server.herokuapp.com/api/v1/users/5ed2a8ad338bcf64692b07ac/plants';
  uploadForm: FormGroup;

  plant: Plant;

  id: string;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private titleService: TitleService,
    private location: Location,
    public formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private store: Store<{ plants: Plant[] }>
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
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
    this.store.select(selectors.getItemById(this.id)).subscribe((plant) =>
      this.plant = plant)
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    const URL = this.ROOT_SERVER_URL + '/' + this.id;
    this.httpClient.patch<any>(URL, this.uploadForm.value).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    // console.log(URL)
  }
}



