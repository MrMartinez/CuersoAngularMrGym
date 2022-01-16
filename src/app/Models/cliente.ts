import { enableProdMode } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';

export class Cliente {
  ClienteId: string;
  Nombres: string;
  Apellidos: string;
  Cedula: string;
  Direccion: string;
  Email: string;
  FechaNacimiento: Date;
  ImgUrl: string;
  Telefono: string;
  visible: boolean;
  ref?: DocumentReference;

  constructor() {
    this.ClienteId = '';
    this.Nombres = '';
    this.Apellidos = '';
    this.Cedula = '';
    this.Direccion = '';
    this.Email = '';
    this.FechaNacimiento = new Date();
    this.ImgUrl = '';
    this.Telefono = '';
    this.visible = false;
  }
}
