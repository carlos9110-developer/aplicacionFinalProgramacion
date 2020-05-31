import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlatosComponent } from './components/platos/platos.component';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { ListadoCarritoComponent } from './components/listado-carrito/listado-carrito.component';
import { MurcielagoComponent } from './components/murcielago/murcielago.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AdminPlatosComponent } from './components/admin-platos/admin-platos.component';


const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'platos', component: PlatosComponent },
  { path: 'adminPlatos', component: AdminPlatosComponent },
  { path: 'calculadora', component: CalculadoraComponent },
  { path: 'listadoCarrito', component: ListadoCarritoComponent },
  { path: 'murcielago', component: MurcielagoComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
