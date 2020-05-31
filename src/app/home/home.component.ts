import { Component, OnInit } from '@angular/core';

// FORM STUFF
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private plantService: PlantService) { }
  userName = 'Cassie';

  selectedFile: File = null;

  ngOnInit(): void {
  }
  onFileSelected(event) {
    this.selectedFile = (event.target.files[0] as File);
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.plantService.uploadImage(fd).subscribe(events => {
      console.log(events);
    });
  }

}

