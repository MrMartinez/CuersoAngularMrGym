import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICliente } from '../Models/cliente';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-clientes',
  templateUrl: './formulario-clientes.component.html',
  styleUrls: ['./formulario-clientes.component.css'],
})
export class FormularioClientesComponent implements OnInit {
  form: FormGroup;
  cliente: ICliente | null;
  subiendo: boolean | null;
  porcentajeImagenSubida: any;
  urlImagen: string = '';
  editando: boolean = false;
  clienteId: string | null;
  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.subiendo = false;
    this.cliente = null;
    this.porcentajeImagenSubida = 0;
    this.clienteId = null;
    this.form = this.formBuilder.group({
      ClienteId: [''],
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Cedula: [''],
      Direccion: [''],
      Email: ['', Validators.email],
      FechaNacimiento: ['', Validators.required],
      ImgUrl: [''],
      Telefono: [''],
    });
  }

  ngOnInit(): void {
    this.clienteId = this.activeRoute.snapshot.params['clienteId'];
    if (this.clienteId != undefined) {
      this.editando = true;
      this.db
        .doc<any>('Clientes/' + this.clienteId)
        .valueChanges()
        .subscribe((clienteDB) => {
          this.form.setValue({
            ClienteId: this.clienteId,
            Nombres: clienteDB.Nombres,
            Apellidos: clienteDB.Apellidos,
            Cedula: clienteDB.Cedula,
            Direccion: clienteDB.Direccion,
            Email: clienteDB.Email,
            FechaNacimiento: new Date(
              clienteDB.FechaNacimiento.seconds * 1000
            ).toISOString(),
            ImgUrl: '',
            Telefono: clienteDB.Telefono,
          });
          this.urlImagen = clienteDB.ImgUrl;
        });
    }
  }

  crearCliente() {
    let error = true;
    this.form.value.ImgUrl = this.urlImagen;
    this.form.value.FechaNacimiento = new Date(this.form.value.FechaNacimiento);

    this.db
      .collection('Clientes')
      .add(this.form.value)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente creado exitosamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/listado-clientes']);
      })
      .catch(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'ERROR! NO SE CREO EL CLIENTE',
          text: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }
  editarCliente() {
    this.form.value.ImgUrl = this.urlImagen;
    this.form.value.FechaNacimiento = new Date(this.form.value.FechaNacimiento);
    console.log(this.form.value);
    this.db
      .doc('Clientes/' + this.clienteId)
      .update(this.form.value)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se guardaron los cambios',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/listado-clientes']);
      })
      .catch(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'ERROR! NO SE CREO EL CLIENTE',
          text: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }
  subirImagen(event: any) {
    this.subiendo = true;
    //Obtengo el archivo que trae el evento
    const file = event.target.files[0];

    //Le quieto la extension al nombre, para luego agregarle la fecha y mas tarde la extension
    let fileName = file.name.split('.').slice(0, -1).join('.');

    //Agrego prefijo de tiempo asi no repito imagen
    let timeToName = new Date().getTime().toString();

    //Obtengo la extension del archvio
    let extensionFilename = file.name
      .toString()
      .substring(file.name.toString().lastIndexOf('.'));

    //Listo! la ruta completa: ruta + nombre de archivo + tiempo de la fecha (para evitar archivos repetidos) + extension

    const filePath = 'Clientes/' + fileName + timeToName + extensionFilename;

    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    //Obtengo la url de la imagen para asignarla a la variable declarada arriba y asi asignar al campo ImgUrl del formulario
    task.then((obj) => {
      ref.getDownloadURL().subscribe((url) => {
        this.urlImagen = url;
      });
    });
    task.percentageChanges().subscribe((porcentaje) => {
      this.porcentajeImagenSubida = porcentaje;
    });
  }

  // getErrorMessage() {
  //   var campoNombres = this.form.get('Nombres');
  //   return campoNombres?.hasError('required')
  //     ? (this.errorNombres = 'No introdujo el Nombre de Cliente')
  //     : '';
  // }
}
