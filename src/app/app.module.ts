import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
// import {LayoutModule} from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormularioClientesComponent } from './formulario-clientes/formulario-clientes.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { PreciosComponent } from './precios/precios.component';
import { SeleccionarClienteComponent } from './seleccionar-cliente/seleccionar-cliente.component';
import { FormularioInscripcionComponent } from './formulario-inscripcion/formulario-inscripcion.component';
import { MensajeValidacionService } from './servicios/mensaje-validacion.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    ListadoClientesComponent,
    InscripcionesComponent,
    FormularioClientesComponent,
    PreciosComponent,
    SeleccionarClienteComponent,
    FormularioInscripcionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    // LayoutModule,
    FlexLayoutModule,
    AngularFireStorageModule,

    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AngularFireAuth, AngularFirestore, MensajeValidacionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
