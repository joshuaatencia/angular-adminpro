import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-page-faound',
  templateUrl: './no-page-faound.component.html',
  styleUrls: [
    './no-page-faound.component.css'
  ]
})
export class NoPageFaoundComponent implements OnInit {

  year = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
