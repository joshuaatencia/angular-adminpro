import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {


  @Input() progreso = 50;
  @Input() btnClass = "btn btn-primary";
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  setProgreso(value: number) {
    if (this.progreso === 0) {
      this.valorSalida.emit(0);
      this.progreso = 0;
    }
    if (this.progreso >= 95) {
      this.valorSalida.emit(95);
      this.progreso = 95;
    }

    this.valorSalida.emit(this.progreso += value);
  }

  onChange(value: number) {
    if (value > 95) {
      this.valorSalida.emit(95);
    }
  }

}
