import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/internal/operators/delay';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  medicos: Medico[];
  cargando = true;
  private imgSuscription = new Subscription();

  constructor(private medicosService: MedicosService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSuscription.unsubscribe();
  }

  


  borrarMedico(medico:Medico){
    Swal.fire({
      title: 'Borrar medico?',
      text: "Esta a punto de borrar a" + medico.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.borrarMedico(medico._id).subscribe(() => {
          Swal.fire(
            'Medico borrado',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
          );
          this.cargarMedicos();
        });
      }
    })
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSuscription = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        this.cargarMedicos();
      });
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicosService.cargarMedicos()
      .subscribe(data => {
        this.cargando = false;
        this.medicos = data;
      })
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(value: string) {
    if (value.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos', value).subscribe((data: Medico[]) => this.medicos = data);
  }

}
