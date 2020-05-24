import { Component, OnInit } from '@angular/core';
import {PLANTS} from '../mock-plants';
@Component({
  selector: 'app-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.scss']
})
export class ForestComponent implements OnInit {
  plants = PLANTS;
  constructor() { }

  ngOnInit(): void {
  }

}
