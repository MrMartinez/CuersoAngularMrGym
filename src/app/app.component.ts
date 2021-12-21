import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MrGym';

  constructor(private auth: AngularFireAuth){}

  login(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.auth.signOut();
  }
}
