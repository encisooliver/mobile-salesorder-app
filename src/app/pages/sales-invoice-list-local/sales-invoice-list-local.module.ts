import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesInvoiceListLocalPageRoutingModule } from './sales-invoice-list-local-routing.module';

import { SalesInvoiceListLocalPage } from './sales-invoice-list-local.page';
import { AppSettings } from 'src/app/settings/app-settings';
import { SysStorageService } from 'src/app/services/sys-storage/sys-storage.service';
import { TrnSalesOrderService } from 'src/app/services/trn-sales-order/trn-sales-order.service';
import { SalesOrderService } from 'src/app/services/sales-order/sales-order.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesInvoiceListLocalPageRoutingModule
  ],
  declarations: [SalesInvoiceListLocalPage],
  providers: [AppSettings, SysStorageService, TrnSalesOrderService, DatePipe, SalesOrderService]
})
export class SalesInvoiceListLocalPageModule {}
