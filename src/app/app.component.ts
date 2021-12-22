import { Component } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MrGym';  
  cargando: boolean = true;
  usuario : any;
  constructor(public auth: AngularFireAuth){
    this.auth.user.subscribe((user)=>{
      setTimeout(() => {
        this.cargando=false;
      this.usuario = user;
      }, 2000);
    });
  }


}
