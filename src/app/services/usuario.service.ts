import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CargarUsuario } from '../interfaces/cargar-usuario.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.mode';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  auth2: any;
  usuario: Usuario;


  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {

        this.router.navigateByUrl('/login');
      });
    });
  }

  googleInit() {

    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1045072534136-oqkjcjvo449uls0bttgvl3aejelh22f5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })

  }

  crearUsuario(formData: RegisterForm) {

    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('menu', JSON.stringify(resp.menu));

        })
      )

  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
          if (formData.remember === true) {
            localStorage.setItem('email', formData.email),
              localStorage.setItem('menu', JSON.stringify(resp.menu));

          }
          else localStorage.removeItem('email');
        })
      );
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: { 'x-token': this.token }
    }).pipe(
      map((resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;

        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', JSON.stringify(resp.menu));

        return true;
      }),
      catchError(error => of(false))
    );
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  get uid() {
    return this.usuario.uid || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  get token() {
    return localStorage.getItem('token') || '';
  }

  loginGoogle(token) {

    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          console.log(resp);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('menu', JSON.stringify(resp.menu));

        })
      );

  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        delay(2000),
        map(resp => {
          const usuarios = resp.usuarios.map(user => new Usuario(user.nombre, user.email, '',
            user.img, user.google, user.role, user.uid));

          return {
            total: resp.total,
            usuarios
          }
        })
      )
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(data: Usuario) {

    return this.http.put(`${base_url}/usuarios/${data.uid}`, data, this.headers);
  }
}
