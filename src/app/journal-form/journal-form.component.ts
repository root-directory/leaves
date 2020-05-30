import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from 'src/services/plant.service';
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
    private route: ActivatedRoute,
    private plantService: PlantService,
    private location: Location,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.httpClient.post<any>('api/journals', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
