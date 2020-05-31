import { Component, OnInit } from '@angular/core';
import { PlatosService } from 'src/app/services/platos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  listaPromociones: any[] = [];

  constructor(private _platosService: PlatosService) {
    this.listarPromociones();
  }

  ngOnInit(): void { }


  listarPromociones() {
    this._platosService.listarPromociones().
      subscribe((datos: any) => {
        this.listaPromociones = datos.promociones;
      });
  }
}
