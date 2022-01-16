import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MensajeValidacionService {
  constructor() {}
  mensajeCorrecto(titulo: string, mensaje: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: titulo,
      text: mensaje,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  mensajeAdvertencia(titulo: string, mensaje: string) {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: titulo,
      text: mensaje,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  mensajeError(titulo: string, mensaje: string) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: titulo,
      text: mensaje,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
