import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlantService } from 'src/services/plant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from '../title.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-journal-form',
  templateUrl: './journal-form.component.html',
  styleUrls: ['./journal-form.component.scss'],
})
export class JournalFormComponent implements OnInit {

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    public service: PlantService,
    private router: Router,
    private titleService: TitleService,
    private activatedRoute: ActivatedRoute
  ) {}
  id: string;
  uploadForm: FormGroup;
  imageUpload: FormGroup;

  selectedFile = null;

  ngOnInit(): void {

    this.titleService.setTitle('My journal');

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.uploadForm = this.formBuilder.group({
      eventType: ['',[Validators.required]],
      image:[null,[Validators.required]],
      info: this.formBuilder.group({
        notes: [''],
        imgUrl: [''],
        file: [null],
      }),
    });
  
  }

  goBack(): void {
    this.location.back();
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  upload() {
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);

      const URL = 'https://root-directory-server.herokuapp.com/api/v1/photos';

      this.service.uploadImage(URL, fd).subscribe((res: {photo_url: string}) => {
        console.log(res);
        this.onSubmit(res.photo_url);
      });
    }else {
      this.onSubmit('');
    }
  }

  onSubmit(imgUrl: string) {
    this.uploadForm.patchValue({
      image: null,
      info: {
        imgUrl,
      },
    });

    this.service.addJournalEntry(this.uploadForm.value, this.id).subscribe(
      (res) => console.log('journal entry success', res),
      (err) => console.log(err)
    );

    // this.router.navigate(['/forest',this.id,'plant-growth'])
  }
}
