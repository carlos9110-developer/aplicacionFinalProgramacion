import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// RUTAS
import { AppRoutingModule } from './app-routing.module';
import { APP_ROUTING } from './app.routes';
// SERVICIOS
import { PlatosService } from './services/platos.service';
// COMPONENTS
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PlatosComponent } from './components/platos/platos.component';

import { HttpClientModule } from '@angular/common/http';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { MurcielagoPipe } from './pipes/murcielago.pipe';
import { CarritoDeComprasComponent } from './components/carrito-de-compras/carrito-de-compras.component';
import { ListadoCarritoComponent } from './components/listado-carrito/listado-carrito.component';
import { MurcielagoComponent } from './components/murcielago/murcielago.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AdminPlatosComponent } from './components/admin-platos/admin-platos.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PlatosComponent,
    CalculadoraComponent,
    MurcielagoPipe,
    CarritoDeComprasComponent,
    ListadoCarritoComponent,
    MurcielagoComponent,
    LoginComponent,
    UsuariosComponent,
    AdminPlatosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTING,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [PlatosService],
  bootstrap: [AppComponent],
})
export class AppModule { }
