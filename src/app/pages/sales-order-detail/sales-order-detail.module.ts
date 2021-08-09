import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesOrderDetailPageRoutingModule } from './sales-order-detail-routing.module';

import { SalesOrderDetailPage } from './sales-order-detail.page';
import { TrnSalesOrderService } from 'src/app/services/trn-sales-order/trn-sales-order.service';
import { AppSettings } from 'src/app/settings/app-settings';
import { SoDetailsComponent } from './components/so-details/so-details.component';
import { SoAttachmentComponent } from './components/so-attachment/so-attachment.component';
import { SoItemsComponent } from './components/so-items/so-items.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesOrderDetailPageRoutingModule
  ],
  declarations: [
    SalesOrderDetailPage,
    SoDetailsComponent,
    SoAttachmentComponent,
    SoItemsComponent,
    
  ],
  providers: [AppSettings, TrnSalesOrderService]
})
export class SalesOrderDetailPageModule {}
