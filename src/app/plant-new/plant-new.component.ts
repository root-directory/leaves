import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';
import { HttpClient } from '@angular/common/http';
import { TitleService } from '../title.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-plant-new',
  templateUrl: './plant-new.component.html',
  styleUrls: ['./plant-new.component.scss'],
})
export class PlantNewComponent implements OnInit {
  ROOT_URL = 'https://root-directory-server.herokuapp.com/api/v1/users/5ed2a8ad338bcf64692b07ac/plants';

  plants: Plant[];
  selectedFile: File = null;
  newPlantForm: FormGroup;
  name: string = null;

  constructor(
    private plantService: PlantService,
    private http: HttpClient,
    private titleService: TitleService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.titleService.setTitle('New member of the forest');

    this.newPlantForm = this.formBuilder.group({
      plantName: ['', [Validators.required, Validators.minLength(4)]],
      imageURL: [null],
      plantType:[''],
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

    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile);
  }

  upload() {
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
      console.log(fd)

      const URL = 'https://root-directory-server.herokuapp.com/api/v1/photos';
      this.onSubmit('url');
      this.http.post(URL, fd).subscribe((res: {photo_url: string}) => {
        console.log(res);
        this.onSubmit(res.photo_url);
      });
    }else {
      this.onSubmit(null);
    }
  }
// https://cassie-test-bucket123.s3-us-west-1.amazonaws.com/1591064998231753.jpg
  onSubmit(imageURL: string|null){
    this.newPlantForm.patchValue({
      imageURL,
    });
    console.log(this.newPlantForm);

    this.plantService.addPlant(this.newPlantForm.value).subscribe(
      (res) => console.log('Plant entry success', res),
      (err) => console.log(err)
    );

  }



}
