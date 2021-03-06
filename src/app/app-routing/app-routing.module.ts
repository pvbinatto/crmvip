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
import { ResetComponent } from '../account/reset/reset.component';
import { ContratoComponent } from '../models/contrato/contrato.component';
import { ProdutoComponent } from '../models/produto/produto.component';
import { ContaComponent } from '../models/conta/conta.component';
import { InvoicesComponent } from '../models/invoices/invoices.component';
import { TicketsComponent } from '../models/tickets/tickets.component';
import { VersionsComponent } from '../models/versions/versions.component';
import { BusinessComponent } from '../models/business/business.component';

const routes: Routes = [
  // {path: '', redirectTo: '', pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'contrato', component: ContratoComponent },
      { path: 'produto', component: ProdutoComponent },
      { path: 'financeiro', component: InvoicesComponent },
      { path: 'atendimento', component: TicketsComponent },
      { path: 'versoes', component: VersionsComponent },
      { path: 'empresa', component: BusinessComponent },
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
      { path: 'reset', component: ResetComponent},
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
