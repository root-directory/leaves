import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-journal-form',
  templateUrl: './journal-form.component.html',
  styleUrls: ['./journal-form.component.scss'],
})
export class JournalFormComponent implements OnInit {
  uploadForm: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      eventType:[''],
      info:this.formBuilder.group({
        notes:[''],
        imgUrl:['']
      } )
      
    });
  }
  eventType:string = '';
  notes:string = '';

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    
    console.log(this.uploadForm)
    this.httpClient.post<any>('api/journals', this.uploadForm.value).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
