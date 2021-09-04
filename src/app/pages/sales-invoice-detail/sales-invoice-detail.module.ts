import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesInvoiceDetailPageRoutingModule } from './sales-invoice-detail-routing.module';

import { SalesInvoiceDetailPage } from './sales-invoice-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesInvoiceDetailPageRoutingModule
  ],
  declarations: [SalesInvoiceDetailPage]
})
export class SalesInvoiceDetailPageModule {}
