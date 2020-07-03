import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';
import { HttpClient } from '@angular/common/http';
import { TitleService } from '../title.service';
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
  ROOT_URL =
    'https://root-directory-server.herokuapp.com/api/v1/users/5ed2a8ad338bcf64692b07ac/plants';

  plants: Plant[];
  selectedFile: File = null;
  selectedFileB64 = null;
  newPlantForm: FormGroup;
  name: string = null;
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
    console.log(this.selectedFile);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFileB64 = reader.result;
      // console.log(this.selectedFileB64);
      // const temp = [
      //   {
      //     id: 25350163,
      //     plant_name: 'Plantago major',
      //     probability: 0.13732277678748092,
      //     confirmed: false,
      //   },
      //   {
      //     id: 25350164,
      //     plant_name: 'Ictodes foetidus',
      //     probability: 0.11510913345976831,
      //     confirmed: false,
      //   },
      //   {
      //     id: 25350165,
      //     plant_name: 'Hosta',
      //     probability: 0.09877065862991363,
      //     confirmed: false,
      //   },
      //   {
      //     id: 25350166,
      //     plant_name: 'Balsamorhiza sagittata',
      //     probability: 0.03445042204960642,
      //     confirmed: false,
      //   },
      // ];

      // this.suggestions = temp;

      this.http.post(plantAIURL,{
        api_key:"HVypPAWwh4uyfACFIXxduzTIxzRSVZJetEiBKkCrN98DSSIYjA",
        images:[this.selectedFileB64],
      }).subscribe(response=>{
        console.log(response)
        this.suggestions=response;
        this.suggestions=this.suggestions.suggestions;
      })
    };
  }

  updatePlantType(value){
    this.newPlantForm.patchValue({plantType: value});
  }

  upload() {
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);

      const URL = 'https://root-directory-server.herokuapp.com/api/v1/photos';
      this.http.post(URL, fd).subscribe((res: { photo_url: string }) => {
        this.onSubmit(res.photo_url);
      });
    } else {
      this.onSubmit(null);
    }
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
