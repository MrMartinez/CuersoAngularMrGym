import { MensajeValidacionService } from './../servicios/mensaje-validacion.service';
import { PreciosComponent } from './../precios/precios.component';
import { Inscripcion } from './../Models/inscripcion';
import { Precio } from './../Models/precio';
import { Cliente } from './../Models/cliente';
import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-inscripcion',
  templateUrl: './formulario-inscripcion.component.html',
  styleUrls: ['./formulario-inscripcion.component.css'],
})
export class FormularioInscripcionComponent implements OnInit {
  inscripcion: Inscripcion;
  clienteSeleccionado: Cliente | null = null;
  listadoPrecios: Precio[] = Array<Precio>();
  precioSeleccionado: Precio | undefined = undefined;

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private mensajeService: MensajeValidacionService
  ) {
    db.collection('Precios')
      .get()
      .subscribe((resultado) => {
        resultado.docs.forEach((item) => {
          let preciosDB: any = item.data() as Precio;
          preciosDB.id = item.id;
          preciosDB.ref = item.ref;
          this.listadoPrecios?.push(preciosDB);
        });
      });

    this.inscripcion = new Inscripcion();
  }

  ngOnInit(): void {}
  asignarCliente(cliente: Cliente) {
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }
  eliminarCliente() {
    this.clienteSeleccionado = null;
    this.inscripcion.cliente = undefined;
  }
  guardarInscripcion() {
    let inscripcionActual = {
      cliente: this.inscripcion.cliente,
      precio: this.inscripcion.precio,
      fechaInicio: this.inscripcion.fechaInicio,
      fechaFinal: this.inscripcion.fechaFinal,
      subTotal: this.inscripcion.subTotal,
      itbis: this.inscripcion.itbis,
      total: this.inscripcion.total,
    };
    if (this.inscripcion.validar().esValido) {
      this.db
        .collection('Inscripciones')
        .add(inscripcionActual)
        .then((resultado) => {
          this.mensajeService.mensajeCorrecto(
            'Inscripcion Guardada',
            'Se guardado correctamente'
          );
          this.router.navigate(['/listado-inscripciones']);
        });
    } else {
      this.mensajeService.mensajeError(
        'ERROR!',
        this.inscripcion.validar().mensaje
      );
    }
  }
  seleccionarPrecio(id: any) {
    if (id.value != 'null') {
      this.precioSeleccionado = this.listadoPrecios.find(
        (x) => x.id == id.value
      );
      this.inscripcion.precio = this.precioSeleccionado?.ref;
      this.inscripcion.fechaInicio = new Date();
      //TODO: IMAGIN PUEDO USAR UN ENUM AQUI PARA EL TIPO DE DURACION y cambiar un por un case
      //Si es Dia
      if (this.precioSeleccionado?.tipoDuracion == 1) {
        let dias: number = this.precioSeleccionado.duracion * 1;
        let fechaFinal = new Date(
          this.inscripcion.fechaInicio.getFullYear(),
          this.inscripcion.fechaInicio.getMonth(),
          this.inscripcion.fechaInicio.getDate() + dias
        );
        this.inscripcion.fechaFinal = fechaFinal;
      }
      //Si es Semana
      if (this.precioSeleccionado?.tipoDuracion == 2) {
        let dias: number = this.precioSeleccionado.duracion * 7;
        let fechaFinal = new Date(
          this.inscripcion.fechaInicio.getFullYear(),
          this.inscripcion.fechaInicio.getMonth(),
          this.inscripcion.fechaInicio.getDate() + dias
        );
        this.inscripcion.fechaFinal = fechaFinal;
      }
      //Si es Quincena
      if (this.precioSeleccionado?.tipoDuracion == 3) {
        let dias: number = this.precioSeleccionado.duracion * 15;
        let fechaFinal = new Date(
          this.inscripcion.fechaInicio.getFullYear(),
          this.inscripcion.fechaInicio.getMonth(),
          this.inscripcion.fechaInicio.getDate() + dias
        );
        this.inscripcion.fechaFinal = fechaFinal;
      }
      //Si es Mes
      if (this.precioSeleccionado?.tipoDuracion == 4) {
        let meses: number = this.precioSeleccionado.duracion * 1;
        let fechaFinal = new Date(
          this.inscripcion.fechaInicio.getFullYear(),
          this.inscripcion.fechaInicio.getDate()
        );
        this.inscripcion.fechaFinal = fechaFinal;
      }
      //Si es ano
      if (this.precioSeleccionado?.tipoDuracion == 5) {
        let anos: number = this.precioSeleccionado.duracion * 1;
        let fechaFinal = new Date(
          this.inscripcion.fechaInicio.getFullYear() + anos,
          this.inscripcion.fechaInicio.getMonth(),
          this.inscripcion.fechaInicio.getDate()
        );
        this.inscripcion.fechaFinal = fechaFinal;
      }

      this.inscripcion.subTotal = this.precioSeleccionado?.costo as number;
      this.inscripcion.itbis = this.inscripcion.subTotal * 0.18;
      this.inscripcion.total =
        this.inscripcion.subTotal + this.inscripcion.itbis;
    } else {
      this.precioSeleccionado = new Precio();
      this.inscripcion.precio = null;
      this.inscripcion.subTotal = 0;
      this.inscripcion.itbis = 0;
      this.inscripcion.total = 0;
      this.inscripcion.fechaInicio = new Date();
      this.inscripcion.fechaFinal = new Date();
    }
  }
}
