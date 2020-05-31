import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-carrito-de-compras',
  templateUrl: './carrito-de-compras.component.html',
  styleUrls: ['./carrito-de-compras.component.css']
})



export class CarritoDeComprasComponent implements OnInit {

  @Input() numeroProductos: number;
  @Output() eventVerListadocarrito: EventEmitter<''>;

  constructor() {
    this.eventVerListadocarrito = new EventEmitter();
  }

  ngOnInit(): void {
  }

  verListadoCarrito() {
    this.eventVerListadocarrito.emit();
  }

}



