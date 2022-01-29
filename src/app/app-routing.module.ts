import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LobbyComponent } from './lobby/lobby.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './screen/home/home.component';

const routes: Routes = [
  { path: '', component: LobbyComponent, pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  // { path: ':id', component: LookProfileComponent },
  { path: 'home', loadChildren: () => import('./screen/screen.module').then(m => m.ScreenModule) },
  { path: '**' , redirectTo: '/' }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
