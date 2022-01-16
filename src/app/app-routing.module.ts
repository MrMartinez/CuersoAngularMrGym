import { FormularioInscripcionComponent } from './formulario-inscripcion/formulario-inscripcion.component';
import { PreciosComponent } from './precios/precios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioClientesComponent } from './formulario-clientes/formulario-clientes.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listado-inscripciones',
    pathMatch: 'full',
  },
  {
    path: 'listado-inscripciones',
    component: InscripcionesComponent,
  },
  {
    path: 'agregar-inscripcion',
    component: FormularioInscripcionComponent,
  },
  {
    path: 'listado-clientes',
    component: ListadoClientesComponent,
  },
  {
    path: 'agregar-cliente',
    component: FormularioClientesComponent,
  },
  {
    path: 'agregar-cliente/:clienteId',
    component: FormularioClientesComponent,
  },
  {
    path: 'precios',
    component: PreciosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
