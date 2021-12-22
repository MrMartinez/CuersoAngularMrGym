import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {path: '', component:InscripcionesComponent},
  {path:'listado-clientes', component:ListadoClientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
