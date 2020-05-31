import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-listado-carrito',
  templateUrl: './listado-carrito.component.html',
  styleUrls: ['./listado-carrito.component.css']
})
export class ListadoCarritoComponent implements OnInit {
  @Input() arraylistadoCarrito: productosCarro[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

interface productosCarro {
  id: number;
  plato: string;
  categoria: string;
  img: string;
  precio: number;
  cantidad: number;
}
