import {
  CUSTOM_ELEMENTS_SCHEMA,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './account/logout/logout.component';
import { TextMaskModule } from 'angular2-text-mask';
import { PasswordComponent } from './account/password/password.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './account/reset/reset.component';
import { ContratoComponent } from './models/contrato/contrato.component';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ContratoitemComponent } from './models/contrato/contratoitem/contratoitem.component';
import { ContratoaddComponent } from './models/contrato/contratoadd/contratoadd.component';
import { ProdutoComponent } from './models/produto/produto.component';
import { AlertComponent } from './shared/alert/alert.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GlobalComponent } from './global/global/global.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { InvoicesComponent } from './models/invoices/invoices.component';

registerLocaleData(ptBr);

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    LoginComponent,
    CreateAccountComponent,
    AuthenticationComponent,
    LogoutComponent,
    PasswordComponent,
    RegistrationComponent,
    ResetComponent,
    ContratoComponent,
    ContratoitemComponent,
    ContratoaddComponent,
    ProdutoComponent,
    AlertComponent,
    GlobalComponent,
    InvoicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TextMaskModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CommonModule,
    FontAwesomeModule,
    CurrencyMaskModule,
    AlifeFileToBase64Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
