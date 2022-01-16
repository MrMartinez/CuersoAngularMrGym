import { DocumentReference } from '@angular/fire/compat/firestore';

export class Inscripcion {
  cliente?: DocumentReference;
  precio?: DocumentReference | null;
  fechaInicio: Date;
  fechaFinal: Date;
  subTotal: number;
  itbis: number;
  total: number;
  constructor() {
    this.fechaInicio = new Date();
    this.fechaFinal = new Date();
    this.subTotal = 0;
    this.itbis = 0;
    this.total = this.subTotal + this.itbis;
  }

  validar(): any {
    let respuesta = {
      esValido: false,
      mensaje: '',
    };

    if (this.cliente == null || this.cliente == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'Debe escoger una inscripcion [Cliente]';
      return respuesta;
    }

    if (this.precio == null || this.precio == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'Debe escoger una inscripcion [Precio]';
      return respuesta;
    }
    if (this.itbis <= 0 || this.itbis == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'ITBIS no calculable';
      return respuesta;
    }
    if (this.subTotal <= 0 || this.subTotal == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'SubTotal no calculable';
      return respuesta;
    }
    if (this.total <= 0 || this.total == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'Total no calculable';
      return respuesta;
    }
    if (this.fechaInicio == null || this.fechaInicio == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'Debe escoger una inscripcion [Fecha]';
      return respuesta;
    }
    if (this.fechaFinal == null || this.fechaFinal == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'Debe escoger una inscripcion [Fecha Final]';
      return respuesta;
    }
    respuesta.esValido = true;
    return respuesta;
  }
}
