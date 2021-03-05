import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [
    './progress.component.css'
  ]
})
export class ProgressComponent implements OnInit {

  progreso1: number = 25;
  progreso2: number = 30;

  constructor() { }

  ngOnInit(): void {
  }

  get getProgreso1(): string {
    return `${this.progreso1}%`;
  }
  get getProgreso2(): string {
    return `${this.progreso2}%`;
  }



}
