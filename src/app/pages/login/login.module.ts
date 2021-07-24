import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { HttpClientModule } from '@angular/common/http';
import { AppSettings } from 'src/app/settings/app-settings';
import { SysLoginService } from 'src/app/services/sys-login/sys-login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [LoginPage],
  providers: [AppSettings, SysLoginService]
  
})
export class LoginPageModule {}
