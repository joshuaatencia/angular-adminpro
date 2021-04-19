import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.mode';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[];
  hospitales: Hospital[];
  medicos: Medico[];

  constructor(private activatedRoute: ActivatedRoute,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => {
      this.busquedaService.busquedadGlobal(termino).subscribe((data: any) => {
        this.usuarios = data.usuarios;
        this.hospitales = data.hospitales;
        this.medicos = data.medicos;
      });
    });
  }

}
