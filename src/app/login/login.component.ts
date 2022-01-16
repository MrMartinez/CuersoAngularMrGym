import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  usuarioExiste: boolean = true;
  
  constructor(private formBuilder: FormBuilder, public auth: AngularFireAuth) {
    
    this.form = this.formBuilder.group({
      correo: ['mr@gmail.com', { validators: [Validators.required, Validators.email] }],

      clave: ['123456789', Validators.required],
    });
  }

  ingresar() {
    if (this.form.valid) {
      
      this.auth.signInWithEmailAndPassword(
          this.form.value.correo,
          this.form.value.clave
        )
        .then((usuario) => {        
        if (usuario) {        
          
          console.log(usuario);
        }
        }).catch((error) =>{
          var mensaje = 'Usuario no existe';
          this.usuarioExiste = false;
       
        });
    }
  }

  ngOnInit(): void {}
  obtenerErrorCampoCorreo() {
    var campoCorreo = this.form.get('correo');
    if (campoCorreo?.hasError('required')) {
      return 'El correo es requerido';
    }
    return '';
  }

  obternerErrorCampoClave() {
    var campoClave = this.form.get('clave');
    if (campoClave?.hasError('required')) {
      return 'La clave es requerida';
    }
    return '';
  }
}
