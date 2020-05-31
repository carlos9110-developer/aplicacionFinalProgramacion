import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private _usuarioService: UsuariosService,
    private _route: Router
  ) {
    this.formLogin = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  iniciarSesion() {
    if (this.formLogin.valid) {
      this._usuarioService.login(this.formLogin.value).subscribe(
        result => {
          if (result['success']) {
            localStorage.setItem("id_user", result['id_user']);
            localStorage.setItem("token", result['token']);
            this._route.navigate(["adminPlatos"]);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: result['msg']
            })
          }
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Mensaje',
            text: "No hay conexión con la api"
          });
          console.log(error);
        }
      );
    } else {
      console.log("datos no validos");
    }
  }

}
