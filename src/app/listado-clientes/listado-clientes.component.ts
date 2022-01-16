import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../Models/cliente';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css'],
})
export class ListadoClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente();
  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.mostrarClientes();
  }
  mostrarClientes() {
    this.clientes.length = 0;
    this.db
      .collection<any>('Clientes')
      .get()
      .subscribe((resultado) => {
        resultado.docs.forEach((item) => {
          var clienteDB = item.data();
          clienteDB.id = item.id;
          clienteDB.ref = item.ref;
          // this.cliente = {
          //   ClienteId: clienteDB.id,
          //   Nombres: clienteDB['Apellidos'],
          //   Apellidos: clienteDB['Nombres'],
          //   Cedula: clienteDB['Cedula'],
          //   Direccion: clienteDB['Direccion'],
          //   Email: clienteDB['Email'],
          //   FechaNacimiento: clienteDB['FechaNacimiento'],
          //   ImgUrl: clienteDB['ImgUrl'],
          //   Telefono: clienteDB['Telefono'],
          // };
          this.clientes.push(clienteDB);
        });
      });
  }

  buscarCliente() {}
}
