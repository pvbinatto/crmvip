import { NgModule } from '@angular/core';
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
import { OwerComponent } from './account/registration/ower/ower.component';
import { FinishComponent } from './account/registration/finish/finish.component';

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
    OwerComponent,
    FinishComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TextMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
