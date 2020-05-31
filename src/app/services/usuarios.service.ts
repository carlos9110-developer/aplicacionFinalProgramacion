import { Injectable } from '@angular/core';
import { CONFIG } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlApi: string;

  constructor(
    private Http: HttpClient
  ) {
    this.urlApi = CONFIG.urlAPi;
  }

  public login(usuario: object) {
    return this.Http.get(this.urlApi + "login/" + usuario['usuario'] + "/" + usuario['pass']);
  }

  /** METODO DONDE SE LISTAN LOS USUARIOS DE LA BASE DE DATOS */
  public traerUsuarios() {
    const headers = new HttpHeaders({
      "Authorization": localStorage.getItem("token")
    });
    return this.Http.get(this.urlApi + "traerUsuarios", { headers });
  }

  /** METODO DONDE SE REGISTRAN LOS USUARIOS */
  public crearUsuario(usuario: object) {
    const headers = new HttpHeaders({
      "Authorization": localStorage.getItem("token")
    });
    return this.Http.post(this.urlApi + "registrarUsuario", usuario, { headers });
  }

  /**METODO DONDE SE REALIZA LA ACTUALIZACIÓN DE UN REGISTRO */
  public editarUsuario(usuario: object) {
    const headers = new HttpHeaders({
      "Authorization": localStorage.getItem("token")
    });
    return this.Http.post(this.urlApi + "editarUsuario", usuario, { headers });
  }


}
