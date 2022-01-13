import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../models/contact/contact.component';
import { AuthenticationComponent } from '../layout/authentication/authentication.component';
import { LoginComponent } from '../account/login/login.component';
import { CreateAccountComponent } from '../account/create-account/create-account.component';
import { AuthGuard } from '../account/shared/auth.guard';
import { LogoutComponent } from '../account/logout/logout.component';
import { PerfilComponent } from '../models/perfil/perfil.component';

const routes: Routes = [
  // {path: '', redirectTo: '', pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'contato', component: ContactComponent },
      { path: 'perfil', component: PerfilComponent },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'create-account', component: CreateAccountComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
