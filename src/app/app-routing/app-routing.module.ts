import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from '../home/home.component';
import { AuthenticationComponent } from '../layout/authentication/authentication.component';
import { LoginComponent } from '../account/login/login.component';
import { CreateAccountComponent } from '../account/create-account/create-account.component';
import { AuthGuard } from '../account/shared/auth.guard';
import { LogoutComponent } from '../account/logout/logout.component';
import { PasswordComponent } from '../account/password/password.component';
import { RegistrationComponent } from '../account/registration/registration.component';
import { OwerComponent } from '../account/registration/ower/ower.component';
import { FinishComponent } from '../account/registration/finish/finish.component';

const routes: Routes = [
  // {path: '', redirectTo: '', pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent }
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
      { path: 'password', component: PasswordComponent},
      { path: 'registration', component: RegistrationComponent},
      { path: 'account/registration/ower', component: OwerComponent},
      { path: 'account/registration/finish', component: FinishComponent}
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
