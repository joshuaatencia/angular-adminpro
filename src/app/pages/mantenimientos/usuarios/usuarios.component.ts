import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.mode';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  totalUsuario = 0;
  usuarios: Usuario[] = [];
  usuariosTemp: Usuario[] = [];
  desde = 0;
  cargando = true;
  imgSuscription: Subscription;

  constructor(private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) { }


  ngOnDestroy(): void {
    this.imgSuscription.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuario();
    this.imgSuscription = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        this.cargarUsuario()
      });
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

  cargarUsuario() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuario = total;
        if (usuarios.length !== 0) {
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        }
      });
  }

  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }
    Swal.fire({
      title: 'Borrar usuario?',
      text: "Esta a punto de borrar a" + usuario.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe(() => {
          Swal.fire(
            'Usuario borrado',
            `${usuario.nombre} fue eliminado correctamente`,
            'success'
          );
          this.cargarUsuario();
        });
      }
    })
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario).subscribe(
      (resp: any) => {
        console.log(resp);
      }
    )
  }

  cambiarPagina(value: number) {
    this.desde += value;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuario) {
      this.desde -= value;
    }

    this.cargarUsuario();
  }



  buscar(value: string) {

    if (value.length === 0) {
      return this.usuarios = [...this.usuariosTemp];
    }

    this.busquedaService.buscar('usuarios', value).subscribe((data: Usuario[]) => this.usuarios = data);
  }

}
