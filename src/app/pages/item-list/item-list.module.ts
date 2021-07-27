import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemListPageRoutingModule } from './item-list-routing.module';

import { ItemListPage } from './item-list.page';
import { MstArticleItemService } from 'src/app/services/mst-article-item/mst-article-item.service';
import { AppSettings } from 'src/app/settings/app-settings';
import { TrnPurchaseRequestItemService } from 'src/app/services/trn-purchase-request-item/trn-purchase-request-item.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemListPageRoutingModule
  ],
  declarations: [ItemListPage],
  providers: [AppSettings, MstArticleItemService, TrnPurchaseRequestItemService]
})
export class ItemListPageModule { }
