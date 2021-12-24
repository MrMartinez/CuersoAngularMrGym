import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ICliente } from '../Models/cliente';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css'],
})
export class ListadoClientesComponent implements OnInit {
  clientes: ICliente[] = [];
  cliente: ICliente | null;
  constructor(private db: AngularFirestore) {
    this.cliente = null;
  }

  ngOnInit(): void {
    // this.db
    //   .collection('Clientes')
    //   .valueChanges()
    //   .subscribe((resultado) => {
    //     this.clientes = resultado;
    //     console.log(resultado);
    //   });
    this.clientes.length = 0;
    this.db
      .collection<any>('Clientes')
      .get()
      .subscribe((resultado) => {
        resultado.docs.forEach((item) => {
          var clienteDB = item.data();
          clienteDB.id = item.id;
          clienteDB.ref = item.ref;
          this.cliente = {
            ClienteId: clienteDB.id,
            Nombres: clienteDB['Apellidos'],
            Apellidos: clienteDB['Nombres'],
            Cedula: clienteDB['Cedula'],
            Direccion: clienteDB['Direccion'],
            Email: clienteDB['Email'],
            FechaNacimiento: clienteDB['FechaNacimiento'],
            ImgUrl: clienteDB['ImgUrl'],
            Telefono: clienteDB['Telefono'],
          };
          this.clientes.push(this.cliente);
        });
      });
  }
}
