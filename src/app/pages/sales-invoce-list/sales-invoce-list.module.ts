import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesInvoceListPageRoutingModule } from './sales-invoce-list-routing.module';

import { SalesInvoceListPage } from './sales-invoce-list.page';
import { AppSettings } from 'src/app/settings/app-settings';
import { TrnSalesOrderService } from 'src/app/services/trn-sales-order/trn-sales-order.service';
import { SalesOrderService } from 'src/app/services/sales-order/sales-order.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesInvoceListPageRoutingModule
  ],
  declarations: [SalesInvoceListPage],
  providers: [AppSettings, TrnSalesOrderService, SalesOrderService]
})
export class SalesInvoceListPageModule {}
