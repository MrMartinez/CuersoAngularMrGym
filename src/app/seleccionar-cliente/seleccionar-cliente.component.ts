import {
  Component,
  Input,
  OnInit,
  NgModule,
  Output,
  EventEmitter,
} from '@angular/core';
import { Cliente } from '../Models/cliente';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.css'],
})
export class SeleccionarClienteComponent implements OnInit {
  listadoClientes: Cliente[] = [];
  cliente: Cliente = new Cliente();
  @Input('nombreCliente') nombreCliente: string | undefined = undefined;
  @Output('seleccionoCliente') seleccionoCliente = new EventEmitter();
  @Output('canceloCliente') canceloCliente = new EventEmitter();
  constructor(private db: AngularFirestore) {
    this.mostrarClientes();
  }

  ngOnInit(): void {}
  mostrarClientes() {
    this.db
      .collection<any>('Clientes')
      .get()
      .subscribe((resultado) => {
        this.listadoClientes.length = 0;
        resultado.docs.forEach((item) => {
          var clienteDB = item.data();
          clienteDB.id = item.id;
          clienteDB.ref = item.ref;
          clienteDB.visible = false;
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
          this.listadoClientes.push(clienteDB);
        });
      });
  }
  buscarCliente(nombreCliente: any) {
    this.listadoClientes.forEach((cliente) => {
      if (
        cliente.Nombres.toLocaleLowerCase().includes(
          nombreCliente.value.toLowerCase()
        )
      ) {
        cliente.visible = true;
      } else {
        cliente.visible = false;
      }
    });
  }

  clienteSeleccionado(cliente: Cliente) {
    this.nombreCliente = cliente.Nombres + ' ' + cliente.Apellidos;
    this.listadoClientes.forEach((cliente) => {
      cliente.visible = false;
    });
    this.seleccionoCliente.emit(cliente);
  }
  cancelarCliente() {
    this.nombreCliente = undefined;
    this.canceloCliente.emit();
  }
}
