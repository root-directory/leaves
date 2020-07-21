import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { HttpClient } from '@angular/common/http';
import { TitleService } from '../../services/title.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-plant-new',
  templateUrl: './plant-new.component.html',
  styleUrls: ['./plant-new.component.scss'],
})
export class PlantNewComponent implements OnInit {
  selectedFile: File = null;
  selectedFileB64 = null;
  newPlantForm: FormGroup;
  suggestions;

  constructor(
    private plantService: PlantService,
    private http: HttpClient,
    private titleService: TitleService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.titleService.setTitle('New plant');

    this.newPlantForm = this.formBuilder.group({
      plantName: ['', [Validators.required, Validators.minLength(4)]],
      suggestions: [''],
      plantType: [''],
      imageURL: [''],
      image: [null, [Validators.required]],
      care: this.formBuilder.group({
        watering: this.formBuilder.group({
          frequency: [''],
          last: [''],
          notes: [''],
        }),
        soil: this.formBuilder.group({
          type: [''],
          last: [''],
          notes: [''],
        }),
        sunlight: this.formBuilder.group({
          duration: [''],
          direction: [''],
          notes: [''],
        }),
      }),
    });
  }

  goBack(): void {
    this.location.back();
  }

  onFileSelected(event) {
    const plantAIURL = 'https://api.plant.id/v2/identify';
    this.selectedFile = event.target.files[0] as File;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFileB64 = reader.result;

      this.http
        .post(plantAIURL, {
          api_key: 'HVypPAWwh4uyfACFIXxduzTIxzRSVZJetEiBKkCrN98DSSIYjA',
          images: [this.selectedFileB64],
        })
        .subscribe((response:{suggestions}) => {
          this.suggestions = response.suggestions;
        });
    };
  }

  updatePlantType(value) {
    this.newPlantForm.patchValue({ plantType: value });
  }

  upload() {
    this.plantService
      .uploadImage(this.selectedFile)
      .subscribe((res: { photo_url: string }) => {
        this.onSubmit(res.photo_url);
      });
  }

  onSubmit(imageURL: string | null) {
    this.newPlantForm.patchValue({
      image: null,
      imageURL,
    });

    this.plantService.addPlant(this.newPlantForm.value).subscribe(
      (res) => {
        console.log('Plant entry success', res);
        this.router.navigate(['/forest']);
      },
      (err) => console.log(err)
    );
  }
}
