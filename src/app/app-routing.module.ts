import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { CarritoComponent } from './Componentes/carrito/carrito.component';
import { ContactoComponent } from './Componentes/contacto/contacto.component';
import { CrudComponent } from './Componentes/crud/crud.component';
import { DetallesComponent } from './Componentes/detalles/detalles.component';
import { DevolucionComponent } from './Componentes/devolucion/devolucion.component';
import { FormasPagoComponent } from './Componentes/formas.pago/formas.pago.component';
import { HomeComponent } from './Componentes/home/home.component';
import { PedidosComponent } from './Componentes/pedidos/pedidos.component';
import { PoliticasComponent } from './Componentes/politicas/politicas.component';
import { PrincipalComponent } from './Componentes/principal/principal.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'formasPago', component: FormasPagoComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'politicas', component: PoliticasComponent },
  { path: 'crud/:admin', component: CrudComponent },
  { path: 'admin', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'devolucion', component: DevolucionComponent },
  { path: 'detalles/:smart', component: DetallesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
