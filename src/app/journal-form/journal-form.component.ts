import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlantService } from 'src/services/plant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-journal-form',
  templateUrl: './journal-form.component.html',
  styleUrls: ['./journal-form.component.scss'],
})
export class JournalFormComponent implements OnInit {

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private service: PlantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  id: string;
  uploadForm: FormGroup;
  imageUpload: FormGroup;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
  };
  httpOptionsTwo = {
    headers: new HttpHeaders({ 'Content-Type': 'application/jpg' }),
  };

  selectedFile = null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.uploadForm = this.formBuilder.group({
      eventType: [''],
      info: this.formBuilder.group({
        notes: [''],
        imgUrl: [''],
      }),
    });

    this.imageUpload = this.formBuilder.group({
      file: [null],
    });
  }

  goBack(): void {
    this.location.back();
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile);
  }

  onUpload() {
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);

      this.imageUpload.patchValue({
        file: this.selectedFile,
      });

      console.log('FD:', this.imageUpload.value);
      const URL = 'https://root-directory-server.herokuapp.com/api/v1/photos';
      // this.httpClient.post(URL,this.selectedFile).subscribe(res=>console.log(res))
      this.httpClient.post(URL, fd).subscribe((res: {photo_url: string}) => {
        console.log(res);
        this.onSubmit(res.photo_url);
      });
    }else {
      this.onSubmit('');
    }

    // this.httpClient.post(URL,this.imageUpload).subscribe(res=>console.log(res))
  }

  onSubmit(imgUrl: string) {
    this.uploadForm.patchValue({
      info: {
        imgUrl,
      },
    });
    console.log(this.uploadForm.value);
    console.log(this.id);
    this.service.addJournalEntry(this.uploadForm.value, this.id).subscribe(
      (res) => console.log('journal entry success', res),
      (err) => console.log(err)
    );

    // this.router.navigate(['/forest',this.id,'plant-growth'])
  }
}
