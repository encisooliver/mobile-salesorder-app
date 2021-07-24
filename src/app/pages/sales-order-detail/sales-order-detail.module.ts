import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesOrderDetailPageRoutingModule } from './sales-order-detail-routing.module';

import { SalesOrderDetailPage } from './sales-order-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesOrderDetailPageRoutingModule
  ],
  declarations: [SalesOrderDetailPage]
})
export class SalesOrderDetailPageModule {}
