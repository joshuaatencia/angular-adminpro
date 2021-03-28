import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  formSubmitted = false;

  auth2: any;


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['123', Validators.required],
    remember: [false]
  });

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {

    this.renderButton();

    const hayEmail = localStorage.getItem('email') || '';

    this.loginForm.patchValue({
      email: hayEmail,
      remember: hayEmail.length > 0 ? true : false
    })
  }

  login() {

    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {

        if (resp.ok === false) { Swal.fire('Error', '', 'error'); } else {
          if (this.loginForm.get('remember').value) {
            localStorage.setItem('email', this.loginForm.get('email').value);
          } else {
            localStorage.removeItem('email');
          }

          this.router.navigateByUrl('/');
        }
      });

  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }

   async startApp() {
    // gapi.load('auth2', () => {
    //   // Retrieve the singleton for the GoogleAuth library and set up the client.
    //   this.auth2 = gapi.auth2.init({
    //     client_id: '969848261401-1pr5jrd0eebspenj25bnp5kb7csm3ut3.apps.googleusercontent.com',
    //     cookiepolicy: 'single_host_origin',
    //     // Request scopes in addition to 'profile' and 'email'
    //     //scope: 'additional_scope'
    //   });
    //   this.attachSignin(document.getElementById('my-signin2'));
    // });

    await this.usuarioService.googleInit();



    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = this.usuarioService.auth2;
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };


  attachSignin(element) {
    
    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            console.log(id_token);
            this.usuarioService.loginGoogle( id_token )
              .subscribe( resp => {
                // Navegar al Dashboard
                // this.ngZone.run( () => {
                  this.ngZone.run(()=>{

                    this.router.navigateByUrl('/'); 
                  });
                // })
              });

        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }
}
