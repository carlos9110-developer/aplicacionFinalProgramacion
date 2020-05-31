import { Component, OnInit } from '@angular/core';
import { PlatosService } from 'src/app/services/platos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var $: any;

@Component({
  selector: 'app-admin-platos',
  templateUrl: './admin-platos.component.html',
  styleUrls: ['./admin-platos.component.css']
})
export class AdminPlatosComponent implements OnInit {
  formPlatos: FormGroup;
  formPlatosEditar: FormGroup;
  formPlatosPromocionar: FormGroup;
  formUsuario: FormGroup;
  formUsuarioEditar: FormGroup;


  listaPlatos: any[] = [];
  banderaCargandoProductos: boolean;

  listaUsuarios: any[] = [];

  listaPedidos: any[] = [];

  listaDetalles: any[] = [];

  moduloPlatos: boolean = true;
  moduloUsuarios: boolean = false;
  moduloPedidos: boolean = false;

  constructor(private _platosService: PlatosService, private _usuarioService: UsuariosService) {
    this.listarPlatos();
    /**SE INICIALIZA EL FORMULARIO PARA REGISTRAR PLATOS */
    this.formPlatos = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required])
    });

    /**SE INICIALIZA EL FORMULARIO PARA EDITAR PLATOS */
    this.formPlatosEditar = new FormGroup({
      id: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required])
    });

    /**SE INICIALIZA EL FORMULARIO PARA PROMOCIONAR PLATOS */
    this.formPlatosPromocionar = new FormGroup({
      id: new FormControl('', [Validators.required]),
      valor_promocion: new FormControl('', [Validators.required])
    });

    /**SE INICIALIZA EL FORMULARIO PARA REGISTRAR USUARIOS */
    this.formUsuario = new FormGroup({
      cedula: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required])
    });

    /**SE INICIALIZA EL FORMULARIO PARA EDITAR USUARIOS */
    this.formUsuarioEditar = new FormGroup({
      id: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required])
    });



  }



  ngOnInit(): void {

  }

  /** METODO PARA LISTAR LOS PLATOS */
  listarPlatos() {
    this.banderaCargandoProductos = false;
    this._platosService.traerPlatosAdmin().
      subscribe((datos: any) => {
        this.listaPlatos = datos.platos;
        this.banderaCargandoProductos = true;
      });
  }

  /** METODO PARA CREAR PLATOS */
  guardarPlato() {
    if (this.formPlatos.valid) {
      this._platosService.crearPlato(this.formPlatos.value).subscribe(
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
            $("#modalCrearPlato").modal("hide");
            this.formPlatos.get('nombre').setValue('');
            this.formPlatos.get('precio').setValue('');
            this.listarPlatos();
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
        text: "Error, debe digitar todos los campos"
      });
    }
  }

  modalEditarPlato(plato: object) {
    this.formPlatosEditar.get('id').setValue(plato['id']);
    this.formPlatosEditar.get('nombre').setValue(plato['plato']);
    this.formPlatosEditar.get('precio').setValue(plato['precio']);
    $("#modalEditarPlato").modal("show");
  }

  /**METODO PARA EDITAR PLATOS */
  editarPlato() {
    if (this.formPlatosEditar.valid) {
      this._platosService.editarPlato(this.formPlatosEditar.value).subscribe(
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
            $("#modalEditarPlato").modal("hide");
            this.formPlatosEditar.get('precio').setValue('');
            this.listarPlatos();
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
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Mensaje',
        text: "Error, debe digitar todos los campos"
      });
    }
  }

  /* METODO PARA ELIMINAR*/
  eliminar(plato) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el plato ' + plato['plato'] + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="far fa-trash-alt"></i> Si',
      cancelButtonText: '<i class="fa fa-times"></i> No'
    }).then((result) => {
      if (result.value) {
        this._platosService.eliminarPlato(plato)
          .subscribe(
            result => {
              if (result['success']) {
                Swal.fire({
                  toast: true,
                  position: 'bottom-end',
                  icon: 'success',
                  title: result['msg'],
                  showConfirmButton: false,
                  timer: 5000
                });
                this.listarPlatos();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Mensaje',
                  text: result['msg']
                })
              }
            }, error => {
              console.log(error);
            }
          );
      }
    });
  }

  /**METODO DONDE SE PROMOCIONA SE ABRE EL MODAL PARA PROMOCIONAR UN DETERMINADO PLATO */
  abrirPromocionarPlato(plato: object) {
    this.formPlatosPromocionar.get('id').setValue(plato['id']);
    $("#modalPromocion").modal("show");
  }

  /* METODO PARA ELIMINAR*/
  promocionarPlato() {
    if (this.formPlatosPromocionar.valid) {
      this._platosService.promocionarPlato(this.formPlatosPromocionar.value).subscribe(
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
            $("#modalPromocion").modal("hide");
            this.formPlatosPromocionar.get('valor_promocion').setValue('');
            this.listarPlatos();
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
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Mensaje',
        text: "Error, debe digitar todos los campos"
      });
    }
  }

  /** METODO PARA QUITAR LA PROMOCIÓN */
  quitarPromocion(plato) {
    Swal.fire({
      title: '¿Estas seguro de quitar la promoción de el plato ' + plato['plato'] + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="far fa-arrow-alt-circle-up"></i> Si',
      cancelButtonText: '<i class="fa fa-times"></i> No'
    }).then((result) => {
      if (result.value) {
        this._platosService.quitarPromocion(plato)
          .subscribe(
            result => {
              if (result['success']) {
                Swal.fire({
                  toast: true,
                  position: 'bottom-end',
                  icon: 'success',
                  title: result['msg'],
                  showConfirmButton: false,
                  timer: 5000
                });
                this.listarPlatos();
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
            }
          );
      }
    });
  }

  /** METODO PARA LISTAR LOS USUARIOS */
  listarUsuarios() {
    this.banderaCargandoProductos = false;
    this._usuarioService.traerUsuarios().
      subscribe((datos: any) => {
        this.listaUsuarios = datos.usuarios;
        this.banderaCargandoProductos = true;
      });
  }

  /**METODO PARA REGISTRAR USUARIOS  */
  guardarUsuario() {
    if (this.formUsuario.valid) {
      this._usuarioService.crearUsuario(this.formUsuario.value).subscribe(
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
            $("#modalCrearUsuario").modal("hide");
            this.formUsuario.get('cedula').setValue('');
            this.formUsuario.get('nombre').setValue('');
            this.listarUsuarios();
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
        text: "Error, debe digitar todos los campos"
      });
    }
  }

  /**METODO DONDE SE ABRE EL MODAL PARA EDITAR UN DETERMINADO USUARIO */
  modalEditarUsuario(usuario) {
    this.formUsuarioEditar.get('id').setValue(usuario['id']);
    this.formUsuarioEditar.get('cedula').setValue(usuario['user']);
    this.formUsuarioEditar.get('nombre').setValue(usuario['name']);
    $("#modalEditarUsuario").modal("show");
  }

  /** METODO DONDE SE REALIZA LA ACTUALIZACIÓN DE UN USUARIO */
  editarUsuario() {
    if (this.formUsuarioEditar.valid) {
      this._usuarioService.editarUsuario(this.formUsuarioEditar.value).subscribe(
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
            $("#modalEditarUsuario").modal("hide");
            this.formUsuario.get('cedula').setValue('');
            this.formUsuario.get('nombre').setValue('');
            this.listarUsuarios();
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
        text: "Error, debe digitar todos los campos"
      });
    }
  }

  /*** FUNCIÓN DONDE SE LISTAN LOS PEDIDOS DE LA BASE DE DATOS */
  listarPedidos() {
    this.banderaCargandoProductos = false;
    this._platosService.traerPedidos().
      subscribe((datos: any) => {
        this.listaPedidos = datos.pedidos;
        this.banderaCargandoProductos = true;
      });
  }

  /**FUNCIÓN DONDE SE LISTAN LOS PRODUCTOS DE UN DETERMINADO PEDIDO */
  ModalVerProductos(id: number) {
    this._platosService.listarDetallePedido(id).
      subscribe((datos: any) => {
        this.listaDetalles = datos.detalle;
      });
    $("#modalVerProductos").modal("show");
  }

  /** FUNCIÓN DONDE SE MUESTRA EL MODULO PARA ADMINISTRAR LOS USUARIOS */
  cambiarModulo(guia: number) {
    this.moduloPlatos = false;
    this.moduloUsuarios = false;
    this.moduloPedidos = false;
    if (guia == 1) {
      this.moduloPlatos = true;
      this.listarPlatos();
    } else if (guia == 2) {
      this.moduloUsuarios = true;
      this.listarUsuarios();
    }
    else if (guia == 3) {
      this.moduloPedidos = true;
      this.listarPedidos();
    }
  }

  /** METODO DONDE SE MARCA EL PEDIDO COMO FACTURADO */
  marcarComoFacturado(id: number) {
    Swal.fire({
      title: '¿Estas seguro de marcar el pedido como facturado ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="fas fa-dollar-sign"></i> Si',
      cancelButtonText: '<i class="fas fa-times"></i> No'
    }).then((result) => {
      if (result.value) {
        this._platosService.marcarComoFacturado(id)
          .subscribe(
            result => {
              if (result['success']) {
                Swal.fire({
                  toast: true,
                  position: 'bottom-end',
                  icon: 'success',
                  title: result['msg'],
                  showConfirmButton: false,
                  timer: 5000
                });
                this.listarPedidos();
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
            }
          );
      }
    });
  }



}
