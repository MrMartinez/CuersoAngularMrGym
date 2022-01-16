import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  usuario:any 
  constructor(private aut: AngularFireAuth) { 
    this.aut.user.subscribe((user)=>{
      this.usuario = user;
      console.log(this.usuario)
    });
  }
  ngOnInit(): void {
   
  }

  salir(){
    this.aut.signOut();
  }
}
