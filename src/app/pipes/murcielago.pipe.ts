import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'murcielago'
})
export class MurcielagoPipe implements PipeTransform {
  murcielago: Array<string> = ['m', 'u', 'r', 'c', 'i', 'e', 'l', 'a', 'g', 'o'];
  nombreConvertidoArreglo: Array<string>;
  transform(value: string): string {

    this.nombreConvertidoArreglo = value.split('');// cree el array
    for (let posicion in this.nombreConvertidoArreglo) {
      for (let posicion2 in this.murcielago) {
        if (this.nombreConvertidoArreglo[posicion] == this.murcielago[posicion2]) {
          this.nombreConvertidoArreglo[posicion] = posicion2;
          break;
        }
      }
    }// primer for in
    return this.nombreConvertidoArreglo.join('');
  }
}
