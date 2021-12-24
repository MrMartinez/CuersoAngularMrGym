import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICliente } from '../Models/cliente';

@Component({
  selector: 'app-formulario-clientes',
  templateUrl: './formulario-clientes.component.html',
  styleUrls: ['./formulario-clientes.component.css'],
})
export class FormularioClientesComponent implements OnInit {
  form: FormGroup;
  cliente: ICliente | null;
  constructor(private formBuilder: FormBuilder) {
    this.cliente = null;
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

  ngOnInit(): void {}

  crearCliente() {}

  onFileSelected() {
    alert('subi un archivo');
  }

  getErrorMessage() {
    var campoNombres = this.form.get('Nombres');
    return campoNombres?.hasError('required')
      ? 'No introdujo el Nombre de Cliente'
      : '';
  }
}
