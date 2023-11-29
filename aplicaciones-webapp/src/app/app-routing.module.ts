import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { RegistroMateriasComponent } from './screens/registro-materias/registro-materias.component';
//import { RegistrarProductoScreenComponent } from './screen/registrar-producto-screen/registrar-producto-screen.component';
import { ListaMateriasComponent } from './screens/lista-materias/lista-materias.component';

const routes: Routes = [
  { path: '', component: LoginScreenComponent, pathMatch: 'full' },
  { path: 'registro', component: RegistroScreenComponent, pathMatch:'full' },
  { path: 'registro/:id', component: RegistroScreenComponent, pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent, pathMatch: 'full' },
  { path: 'regist', component: RegistroMateriasComponent, pathMatch: 'full' },
  //{ path: 'producto', component: RegistrarProductoScreenComponent, pathMatch:'full'},
  { path: 'regist/:id', component: RegistroMateriasComponent, pathMatch: 'full' },
  { path: 'lista-materias', component: ListaMateriasComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
