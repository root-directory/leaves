import { Component, OnInit } from '@angular/core';

//FORM STUFF
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName = 'Cassie';
  constructor(private plantService:PlantService) { }

  ngOnInit(): void {
  }

  selectedFile:File = null;
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0]
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name);
    this.plantService.uploadImage(fd).subscribe(events => {
      console.log(events)
    })
  }

}

