import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TitleService } from '../title.service';
import * as selectors from '../../Rx/plants.selector';
import { Store, select } from '@ngrx/store';
import { updateCare } from 'src/Rx/plants.actions';

@Component({
  selector: 'app-care-form',
  templateUrl: './care-form.component.html',
  styleUrls: ['./care-form.component.scss'],
})
export class CareFormComponent implements OnInit {
  uploadForm: FormGroup;
  plant: Plant;
  id: string;
  changed: boolean;
  initialFormValue;

  constructor(
    private route: ActivatedRoute,
    public service: PlantService,
    private titleService: TitleService,
    private location: Location,
    public formBuilder: FormBuilder,
    private store: Store<{ plants: Plant[] }>
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPlant();
    this.uploadForm = this.formBuilder.group({
      care: this.formBuilder.group({
        watering: this.formBuilder.group({
          frequency: [this.plant ? this.plant.care.watering.frequency : ''],
          last: [this.plant ? this.plant.care.watering.last : ''],
          notes: [this.plant ? this.plant.care.watering.notes : ''],
        }),
        soil: this.formBuilder.group({
          type: [this.plant ? this.plant.care.soil.type : ''],
          last: [this.plant ? this.plant.care.soil.last : ''],
          notes: [this.plant ? this.plant.care.soil.notes : ''],
        }),
        sunlight: this.formBuilder.group({
          duration: [this.plant ? this.plant.care.sunlight.duration : ''],
          direction: [this.plant ? this.plant.care.sunlight.direction : ''],
          notes: [this.plant ? this.plant.care.sunlight.notes : ''],
        }),
      }),
    });

    this.initialFormValue = this.uploadForm.value;
    this.titleService.setTitle('Care Log');
    this.uploadForm.valueChanges.subscribe((result) => {
      this.changed = this.uploadForm.dirty && !this.isInitialValue();
    });
  }

  isInitialValue() {
    return (
      JSON.stringify(this.initialFormValue) ===
      JSON.stringify(this.uploadForm.value)
    );
  }

  getPlant(): void {
    this.store
      .select(selectors.getItemById(this.id))
      .subscribe((plant) => (this.plant = plant));
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.service.postCareForm(this.id, this.uploadForm.value).subscribe(
      (res) => {
        console.log(res);
        this.store.dispatch(updateCare({plant: res}));
      },
      (err) => console.log(err)
    );
  }
}
