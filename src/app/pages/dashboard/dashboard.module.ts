import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { BrowserModule } from '@angular/platform-browser';
import { LocalSalesOrderService } from 'src/app/version-two/software-services/local-services/local-sales-order.service';
import { Storage } from '@ionic/storage-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
  ],
  declarations: [DashboardPage],
  providers: [LocalSalesOrderService, Storage]
})
export class DashboardPageModule { }
