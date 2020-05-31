import { Component, OnInit } from '@angular/core';
import { PlatosService, Plato } from '../../services/platos.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css']
})
export class PlatosComponent implements OnInit {

  listaPlatos: any[] = [];
  // variable donde se guardan los productos que se van almacenando a la base de datos
  arrayProductosCarrito: productosCarro[] = [];
  // el valor de esta variable sera asignado por medio de input a la variabl numeroProductos de carrito de compras
  contadorProductos: number;
  // variable que me indica si queremos ver el listado del carrito de compras
  banderaListadoCarrito: boolean;

  // variable que sirve para validar el valor de un determinado producto
  valorTotal: number = 0;

  // variable que sirve para mostrar la imagen de cargando
  banderaCargandoProductos: boolean;

  formPedidos: FormGroup;

  // variable que almacena los datos que se envian a la api
  datosPedidoApi: any[] = [];

  constructor(private _platosService: PlatosService) {
    this.contadorProductos = 0;
    this.banderaListadoCarrito = false;
    this.banderaCargandoProductos = false;

    this.formPedidos = new FormGroup({
      cedula: new FormControl('', [Validators.required]),
      cliente: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this._platosService.traerPlatosPagina().
      subscribe((datos: any) => {
        this.listaPlatos = datos.platos;
        this.banderaCargandoProductos = true;
      });

    /*
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })
    */
  }

  agregar(plato: any) {
    this.contadorProductos++;
    const index = this.arrayProductosCarrito.findIndex(productoCarrito => productoCarrito.id === plato.id);
    // tslint:disable-next-line: triple-equals
    if (index == -1) {
      plato.cantidad = 1;
      this.arrayProductosCarrito.push(plato);
    } else {
      this.arrayProductosCarrito[index].cantidad++;
    }
    console.log(this.arrayProductosCarrito);
    if (plato.promocion === "0") {
      this.valorTotal = this.valorTotal + plato.precio;
    } else {
      this.valorTotal = this.valorTotal + plato.precio_promocion;
    }
  }

  verListadoCarrito() {
    this.banderaListadoCarrito = true;
  }

  volverListadoComidas() {
    this.banderaListadoCarrito = false;
  }

  guardarPedido() {
    if (this.formPedidos.valid && this.arrayProductosCarrito.length > 0) {
      this.datosPedidoApi = this.formPedidos.value;
      this.datosPedidoApi['total'] = this.valorTotal;
      this.datosPedidoApi['detallePedido'] = this.arrayProductosCarrito;
      console.log(this.datosPedidoApi);
      this._platosService.registrarPedido(this.datosPedidoApi).subscribe(
        result => {
          console.log(result);
          if (result['success']) {
            Swal.fire({
              toast: true,
              position: 'bottom-end',
              icon: 'success',
              title: result['msg'],
              showConfirmButton: false,
              timer: 5000
            });
            this.volverListadoComidas();
            this.arrayProductosCarrito = [];
            this.contadorProductos = 0;
            this.valorTotal = 0;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Mensaje',
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
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Mensaje',
        text: "Debe llenar todos los campos, y agregar por lo menos un producto al carrito de compras"
      });
    }
  }



}

// tslint:disable-next-line: class-name
interface productosCarro {
  id: number;
  plato: string;
  categoria: string;
  img: string;
  precio: number;
  cantidad: number;
}
