import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesOrderListPageRoutingModule } from './sales-order-list-routing.module';

import { SalesOrderListPage } from './sales-order-list.page';
import { AppSettings } from 'src/app/settings/app-settings';
import { TrnSalesOrderService } from 'src/app/services/trn-sales-order/trn-sales-order.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesOrderListPageRoutingModule
  ],
  declarations: [SalesOrderListPage],
  providers: [AppSettings, TrnSalesOrderService]
})
export class SalesOrderListPageModule {}
