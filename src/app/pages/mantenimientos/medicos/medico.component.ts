import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicosService } from 'src/app/services/medicos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  medicoForm: FormGroup;
  hospitales: Hospital[];
  hopitalSeleccionado: Hospital;
  medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {

      if (id === 'nuevo') return;

      this.medicoService.obtenerMedicoPorId(id)
      .pipe(
        delay(100)
      )
      .subscribe(data => {

        if(!data) return this.router.navigateByUrl(`/dashboard/medicos`);


        const { nombre, hospital: { _id } } = data;
        this.medicoSeleccionado = data;
        this.medicoForm.setValue({ nombre, hospital: _id });
      });

    });


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges.subscribe(value => {
      this.hopitalSeleccionado = this.hospitales.find(h => h._id == value);
    });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe((data: Hospital[]) => this.hospitales = data);
  }

  guardarMedico() {
    if (this.medicoSeleccionado) {
      //actualizar
      const { nombre } = this.medicoForm.value;
      const data = { ...this.medicoForm.value, _id: this.medicoSeleccionado._id };

      this.medicoService.actualizarMedico(data).subscribe(resp => {
        Swal.fire('Actualizado', `${nombre} Actualizado correctamente`, 'success');
      })

    } else {
      //guardar 
      const { nombre } = this.medicoForm.value;
      this.medicoService.crearMedico(this.medicoForm.value).subscribe((resp: any) => {
        Swal.fire('Creado', `${nombre} Creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
      })
    }
  }

}
