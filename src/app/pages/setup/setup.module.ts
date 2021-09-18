import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetupPageRoutingModule } from './setup-routing.module';

import { SetupPage } from './setup.page';
import { AppSettings } from 'src/app/settings/app-settings';
import { SetupService } from 'src/app/services/setup/setup.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Storage } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetupPageRoutingModule
  ],
  declarations: [SetupPage],
  providers: [AppSettings, SetupService, ToastService, Storage]
})
export class SetupPageModule {}
