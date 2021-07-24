import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesOrderListPageRoutingModule } from './sales-order-list-routing.module';

import { SalesOrderListPage } from './sales-order-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesOrderListPageRoutingModule
  ],
  declarations: [SalesOrderListPage]
})
export class SalesOrderListPageModule {}
