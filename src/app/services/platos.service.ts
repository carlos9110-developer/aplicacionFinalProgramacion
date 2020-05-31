import { Injectable } from '@angular/core';
import { CONFIG } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {
  private urlApi: string;


  constructor(private _http: HttpClient) {
    this.urlApi = CONFIG.urlAPi;
    console.log('Servicio listo para usar!!!');
  }

  // método para traer los productos de la api
  /*
  public getPlatosApi() {
    this._http.get('http://127.0.0.1:8000/api/food').
      subscribe(datos => {
        console.log(datos);
      });
  }
  */

  /** METODO PARA TRAER LOS PLATOS DE LA BASE DE DATOS PARA LISTAR EN LA PAGINA PRINCIPAL */
  public traerPlatosPagina() {
    return this._http.get(this.urlApi + "traerPlatosPagina");
    //return this._http.get('http://www.apirest.890m.com/api/food');
  }

  /** METODO PARA REGISTRAR LOS PEDIDOS EN LA BASE DE DATOS */
  public registrarPedido(pedido: object) {
    return this._http.post(this.urlApi + "registrarPedido", pedido);
    //return this._http.get('http://www.apirest.890m.com/api/food');
  }

  /** METODO PARA TRAER LOS PLATOS DE LA BASE DE DATOS CUANDO A LA PAGINA PRINCIPAL */
  public traerPlatosAdmin() {
    const headers = new HttpHeaders({
      "Authorization": localStorage.getItem("token")
    });

    return this._http.get(this.urlApi + "traerPlatos", { headers });
    //return this._http.get('http://www.apirest.890m.com/api/food');
  }

  /** METODO PARA CREAR UN DETERMINADO PLATO */
  public crearPlato(plato: object) {
    const headers = new HttpHeaders({
      "Authorization": localStorage.getItem("token")
    });
    return this._http.post(this.urlApi + "registrarPlato", plato, { headers });
  }

  /**   METODO PARA ELIMINAR PLATO */
  public eliminarPlato(plato) {
    const headers = new HttpHeaders({
      "Authorization": localStorage.getItem("token")
    });
    return this._http.delete(this.urlApi + "eliminarPlato/" + plato['id'], { headers });
  }

  /**   METODO PARA EDITAR PLATO */
  public editarPlato(plato) {
    const headers = new HttpHeaders({
      "Authorization": localStorage.getItem("token")
    });
    return this._http.put(this.urlApi + "actualizarPlato", plato, { headers });
  }

  /**   METODO PARA PROMOCIONAR UN PLATO */
  public promocionarPlato(plato) {
    const headers = new HttpHeaders({
      "Authorization": localStorage.getItem("token")
    });
    return this._http.put(this.urlApi + "promocionarPlato", plato, { headers });
  }

  /**   METODO PARA QUITAR LA PROMOCIÓN DE UN PLATO */
  public quitarPromocion(plato) {
    const headers = new HttpHeaders({
      "Authorization": localStorage.getItem("token")
    });
    return this._http.put(this.urlApi + "quitarPromocion", plato, { headers });
  }

  /**METODO DONDE SE LISTAN LOS PEDIDOS DE LA BASE DE DATOS */
  public traerPedidos() {
    const headers = new HttpHeaders({
      "Authorization": localStorage.getItem("token")
    });
    return this._http.get(this.urlApi + "traerPedidos", { headers });
  }

  /**METODO DONDE SE LISTAN LOS PEDIDOS DE LA BASE DE DATOS */
  public listarDetallePedido(id: number) {
    const headers = new HttpHeaders({
      "Authorization": localStorage.getItem("token")
    });
    return this._http.get(this.urlApi + "listarDetallePedido/" + id, { headers });
  }

  /**METODO DONDE SE PONE UN PEDIDO COMO FACTURADO */
  public marcarComoFacturado(id: number) {
    const headers = new HttpHeaders({
      "Authorization": localStorage.getItem("token")
    });
    return this._http.put(this.urlApi + "marcarComoFacturado", { "id": id }, { headers });
  }

  /**METODO DONDE SE LISTAN LAS PROMOCIONES DE LA BASE DE DATOS */
  public listarPromociones() {
    return this._http.get(this.urlApi + "listarPromociones");
  }

}
export interface Plato {
  plato: string;
  precio: number;
  img: string;
}
