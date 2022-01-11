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
  precio: IPrecio | null = null;
  esEditable: boolean = false;
  precioId: string = '';

  constructor(private formBuilder: FormBuilder, private db: AngularFirestore) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.listadoPrecios = [];
    this.muestraPrecios();
  }

  crearPrecio() {
    this.db
      .collection('Precios')
      .add(this.form.value)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Precio creado exitosamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.form.reset();
        this.listadoPrecios = [];
        this.muestraPrecios();
      })
      .catch(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error creando precio',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }
  editar() {
    this.db
      .doc('Precios/' + this.precioId)
      .update(this.form.value)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Precio actualizado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.form.reset();
        this.esEditable = false;
        this.listadoPrecios = [];
        this.muestraPrecios();
      });
  }
  editarPrecio(precio: IPrecio) {
    this.esEditable = true;
    this.form.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion,
    });
    this.precioId = precio.precioId;
  }
  muestraPrecios() {
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
            costo: precioDB['costo'],
            tipoDuracion: precioDB['tipoDuracion'],
          };
          this.listadoPrecios.push(this.precio);
        });
      });
  }
  eliminarPrecio() {
    Swal.fire({
      title: 'Eliminar Precio',
      text: '¿Seguro desea eliminar este precio?',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#FA1E18',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        alert('Dijo que si');
      }
    });
  }
}
