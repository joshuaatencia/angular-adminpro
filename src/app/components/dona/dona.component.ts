import { Component, Input, OnInit } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: []
})
export class DonaComponent implements OnInit {

  @Input() titulo = '';
  @Input() chartLabel: Label[];
  @Input() chartData: MultiDataSet[];
  // public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100],
  // ];


  constructor() { }

  ngOnInit(): void {
  }

}
