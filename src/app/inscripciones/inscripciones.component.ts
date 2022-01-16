import { Cliente } from './../Models/cliente';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../Models/inscripcion';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css'],
})
export class InscripcionesComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion();
  listadoInscripciones: any[] = [];

  constructor(private db: AngularFirestore) {}
  ngOnInit(): void {
    this.mostrarInscripciones();
  }

  mostrarInscripciones() {
    this.listadoInscripciones.length = 0;
    this.db
      .collection('Inscripciones')
      .get()
      .subscribe((resultado) => {
        resultado.forEach((item) => {
          let inscripcionActual: any = item.data();
          inscripcionActual.id = item.id;

          this.db
            .doc(inscripcionActual.cliente.path)
            .get()
            .subscribe((cliente) => {
              inscripcionActual.Cliente = cliente.data();
              inscripcionActual.fechaInicio = new Date(
                inscripcionActual.fechaInicio.seconds * 1000
              );
              inscripcionActual.fechaFinal = new Date(
                inscripcionActual.fechaFinal.seconds * 1000
              );
              this.listadoInscripciones.push(inscripcionActual);
              console.log(this.listadoInscripciones);
            });

          //console.log(inscripcionActual);
        });
      });
  }
}
