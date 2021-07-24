import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Componentes/home/home.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { PoliticasComponent } from './Componentes/politicas/politicas.component';
import { FooterComponent } from './Componentes/footer/footer.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule,BUCKET } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrudComponent } from './Componentes/crud/crud.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetallesComponent } from './Componentes/detalles/detalles.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { DevolucionComponent } from './Componentes/devolucion/devolucion.component';
import { ContactoComponent } from './Componentes/contacto/contacto.component';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { CarritoComponent } from './Componentes/carrito/carrito.component';
import { PedidosComponent } from './Componentes/pedidos/pedidos.component';
import { FormasPagoComponent } from './Componentes/formas.pago/formas.pago.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PoliticasComponent,
    FooterComponent,
    CrudComponent,
    DetallesComponent,
    LoginComponent,
    RegisterComponent,
    DevolucionComponent,
    ContactoComponent,
    PrincipalComponent,
    CarritoComponent,
    PedidosComponent,
    FormasPagoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule
    
  ],
  providers: [{provide: BUCKET, useValue: 'gs://moda-b906d.appspot.com'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
