import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoItemDetailPageRoutingModule } from './so-item-detail-routing.module';

import { SoItemDetailPage } from './so-item-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoItemDetailPageRoutingModule
  ],
  declarations: [SoItemDetailPage]
})
export class SoItemDetailPageModule {}
