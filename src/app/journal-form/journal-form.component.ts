import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PlantService } from 'src/services/plant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-journal-form',
  templateUrl: './journal-form.component.html',
  styleUrls: ['./journal-form.component.scss'],
})
export class JournalFormComponent implements OnInit {
  id: string;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private service: PlantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  uploadForm: FormGroup;


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.uploadForm = this.formBuilder.group({
      eventType: [''],
      info: this.formBuilder.group({
        notes: [''],
        imgUrl: [''],
      }),
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    console.log(this.uploadForm.value);
    console.log(this.id)
    this.service.addJournalEntry(this.uploadForm.value,this.id).subscribe(
      (res)=> console.log('journal entry success',res),
      (err) => console.log(err)
    );
    // this.httpClient.post<any>('api/journals', this.uploadForm.value).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );
    // this.router.navigate(['/forest',this.id,'plant-growth'])
  }
}
