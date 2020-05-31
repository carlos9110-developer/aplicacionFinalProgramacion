import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
})
export class CalculadoraComponent implements OnInit {
  campo1: FormControl = new FormControl('');
  campo2: FormControl = new FormControl('');
  valorPantallaFinal: string;
  numeroPantalla: string;
  accionRealizada: boolean = false;
  bloqueado: boolean = false;
  ultimoNumero: number;
  penultimoNumero: number;
  ultimoCaracter: string;
  contNumeros: number = 0;
  operacionRealizar: string;
  bloqueoIgual: boolean = true;
  vieneDeOperacion: boolean = false;

  constructor() {
    this.campo1.setValue('0');
  }

  ngOnInit(): void {}

  eleccionNumero(numero: string) {
    if (this.accionRealizada == false) {
      this.bloqueado = false;
      this.campo2.setValue('');
      this.numeroPantalla = numero;
      this.accionRealizada = true;
    } else {
      if (
        this.ultimoCaracter != '+' &&
        this.ultimoCaracter != '-' &&
        this.ultimoCaracter != '*' &&
        this.ultimoCaracter != '/'
      ) {
        this.numeroPantalla = this.numeroPantalla + numero;
      } else {
        this.numeroPantalla = numero;
        this.penultimoNumero = this.ultimoNumero;
        this.bloqueoIgual = false;
      }
    }
    this.campo1.setValue(this.numeroPantalla);
    this.ultimoNumero = parseInt(this.numeroPantalla);
    this.ultimoCaracter = numero;
    this.vieneDeOperacion = false;
  }

  eleccionOperacion(operacion: string) {
    if (this.accionRealizada == true) {
      if (
        this.ultimoCaracter != '+' &&
        this.ultimoCaracter != '-' &&
        this.ultimoCaracter != '*' &&
        this.ultimoCaracter != '/'
      ) {
        this.contNumeros++;
        if (this.contNumeros > 1) {
          this.valorPantallaFinal =
            this.valorPantallaFinal + this.numeroPantalla + operacion;
          this.realizarOperacion();
        } else {
          this.valorPantallaFinal = this.numeroPantalla + operacion;
        }
      } else {
        this.valorPantallaFinal = this.valorPantallaFinal.slice(0, -1);
        this.valorPantallaFinal = this.valorPantallaFinal + operacion;
      }
      this.campo2.setValue(this.valorPantallaFinal);
    }
    this.ultimoCaracter = operacion;
    this.numeroPantalla = '';
    this.operacionRealizar = operacion;
  }

  // método para realizar una determinada operación
  private realizarOperacion() {
    if (this.operacionRealizar == '+') {
      this.ultimoNumero = this.penultimoNumero + this.ultimoNumero;
      this.numeroPantalla = this.ultimoNumero.toString();
      this.vieneDeOperacion = true;
    } else if (this.operacionRealizar == '-') {
      this.ultimoNumero = this.penultimoNumero - this.ultimoNumero;
      this.numeroPantalla = this.ultimoNumero.toString();
      this.vieneDeOperacion = true;
    } else if (this.operacionRealizar == '*') {
      this.ultimoNumero = this.penultimoNumero * this.ultimoNumero;
      this.numeroPantalla = this.ultimoNumero.toString();
      this.vieneDeOperacion = true;
    } else if (this.operacionRealizar == '/') {
      if (this.ultimoNumero != 0) {
        this.ultimoNumero = this.penultimoNumero / this.ultimoNumero;
        this.numeroPantalla = this.ultimoNumero.toString();
        this.vieneDeOperacion = true;
      } else {
        this.borrarTodo(2);
        this.numeroPantalla = 'No se puede dividir entre cero';
        this.bloqueado = true;
      }
    }
    this.campo1.setValue(this.numeroPantalla);
  }

  // metodo donde se borra todo
  borrarTodo(guia: number) {
    guia != 3 ? this.campo1.setValue('0') : '';
    guia != 3 ? this.campo2.setValue('') : '';
    guia == 1 ? (this.valorPantallaFinal = '') : '';
    this.numeroPantalla = '';
    this.accionRealizada = false;
    this.bloqueado = false;
    this.contNumeros = 0;
    this.bloqueoIgual = true;
    this.vieneDeOperacion = false;
  }

  // método donde se realiza el igual de las operaciones
  igual() {
    if (this.vieneDeOperacion == false) {
      this.valorPantallaFinal =
        this.valorPantallaFinal + this.numeroPantalla + '=';
      this.realizarOperacion();
    } else {
      this.valorPantallaFinal = this.valorPantallaFinal.slice(0, -1);
      this.valorPantallaFinal = this.valorPantallaFinal + '=';
    }
    this.campo2.setValue(this.valorPantallaFinal);
    this.borrarTodo(3);
    this.bloqueado = true;
    this.bloqueoIgual = false;
  }
}
