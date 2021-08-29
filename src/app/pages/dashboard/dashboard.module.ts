import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { BrowserModule } from '@angular/platform-browser';
import { Storage } from '@ionic/storage-angular';
import { SysStorageService } from 'src/app/services/sys-storage/sys-storage.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
  ],
  declarations: [DashboardPage],
  providers: [SysStorageService, Storage]
})
export class DashboardPageModule { }
