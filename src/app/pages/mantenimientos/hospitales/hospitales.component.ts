import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  cargando = true;
  hospitales: Hospital[] = [];
  private imgSuscription = new Subscription();

  constructor(private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSuscription.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSuscription = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        this.cargarHospitales();
      });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe(data => {
      this.cargando = false;
      this.hospitales = data;
    })
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(resp => {
        this.cargarHospitales();
        Swal.fire('Actualizado', hospital.nombre, 'success');
      })
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id)
      .subscribe(resp => {
        this.cargarHospitales();
        Swal.fire('Eliminado', hospital.nombre, 'success');
      })
  }

  async abrirSweetAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Introduce el nombre'
    })



    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value)
        .subscribe((resp: any) => {
          this.hospitales.push(resp.hospital)
        })
    }
  }


  buscar(value: string) {

    if (value.length === 0) {
      return this.cargarHospitales();
    }

    this.busquedaService.buscar('hospitales', value).subscribe((data: Hospital[]) => this.hospitales = data);
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);

  }

}
