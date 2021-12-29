import { IPrecio } from './../Models/precio';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css'],
})
export class PreciosComponent implements OnInit {
  form: FormGroup;
  listadoPrecios: IPrecio[] = new Array<IPrecio>();
  precio: IPrecio | null;
  constructor(private formBuilder: FormBuilder, private db: AngularFirestore) {
    this.precio = null;
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.db
      .collection<any>('Precios')
      .get()
      .subscribe((resultado) => {
        resultado.docs.forEach((item) => {
          var precioDB = item.data();
          precioDB.id = item.id;
          precioDB.ref = item.ref;

          this.precio = {
            precioId: precioDB.id,
            nombre: precioDB['nombre'],
            duracion: parseInt(precioDB['duracion']),
            costo: precioDB['nombre'],
            tipoDuracion: precioDB['nombre'],
          };
          this.listadoPrecios.push(this.precio);
        });
      });
  }

  crearPrecio() {
    this.db
      .collection('Precios')
      .add(this.form.value)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente creado exitosamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.form.reset;
      });
    console.log(this.form.value);
  }
  editarPrecio() {}
}
