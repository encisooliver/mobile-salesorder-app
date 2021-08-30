import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesOrderListLocalPageRoutingModule } from './sales-order-list-local-routing.module';

import { SalesOrderListLocalPage } from './sales-order-list-local.page';
import { SysStorageService } from 'src/app/services/sys-storage/sys-storage.service';
import { AppSettings } from 'src/app/settings/app-settings';
import { TrnSalesOrderService } from 'src/app/services/trn-sales-order/trn-sales-order.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesOrderListLocalPageRoutingModule
  ],
  declarations: [SalesOrderListLocalPage],
  providers: [AppSettings, SysStorageService, TrnSalesOrderService, DatePipe]
})
export class SalesOrderListLocalPageModule { }
