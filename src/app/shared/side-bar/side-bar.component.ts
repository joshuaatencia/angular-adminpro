import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.mode';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public sidebarServices: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
