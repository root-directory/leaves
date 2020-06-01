import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-journal-form',
  templateUrl: './journal-form.component.html',
  styleUrls: ['./journal-form.component.scss'],
})
export class JournalFormComponent implements OnInit {
  id: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {}
  uploadForm: FormGroup;
  eventType = '';
  notes = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.uploadForm = this.formBuilder.group({
      eventType: [''],
      info: this.formBuilder.group({
        notes: [''],
        imgUrl: ['']
      } )

    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    const journalURL = 'https://root-directory-server.herokuapp.com/api/v1/users/5ed2a8ad338bcf64692b07ac/plants/5ed2af46be7270109dad3dd7/journal'
    console.log('THISSSSSS HEREEEEE',this.uploadForm.value);
    this.httpClient.post<any>(journalURL, this.uploadForm.value).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.router.navigate(['/forest',this.id,'plant-growth'])
    
  }
}
