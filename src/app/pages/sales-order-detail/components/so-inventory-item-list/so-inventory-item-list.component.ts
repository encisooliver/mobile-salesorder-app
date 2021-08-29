import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MstArticleItemService } from 'src/app/services/mst-article-item/mst-article-item.service';
import { Storage } from '@ionic/storage-angular';
import { SoItemDetailComponent } from '../so-item-detail/so-item-detail.component';
import { TrnPurchaseOrderItemModel } from 'src/app/models/trn-purchase-order-item.model';
import { TrnSalesOrderItemModel } from 'src/app/models/trn-sales-order-item.model';
import { TrnSalesOrderModel } from 'src/app/models/trn-sales-order.model';

@Component({
  selector: 'app-so-inventory-item-list',
  templateUrl: './so-inventory-item-list.component.html',
  styleUrls: ['./so-inventory-item-list.component.scss'],
})
export class SoInventoryItemListComponent implements OnInit {

  token: string = "";
  branchId: number = 0;
  @Input() sOModel: TrnSalesOrderModel = new TrnSalesOrderModel();

  constructor(
    private mstArticleItemService: MstArticleItemService,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {
   
  }

  articleItemListPageIndex: number = 15;
  itemListSkip: number = 0;
  itemListTake: number = 15;
  searchItemKeywords: string = "";
  searchItemColumn: string = "All"

  PRId: number = 0;

  isButtonAddArticleItemDisabled: boolean = false;
  items: any[] = [];
  soItems: TrnSalesOrderItemModel[] = [];
  getArticleItemList(): void {

    let column = this.searchItemColumn;
    let skip = this.itemListSkip;
    let take = this.itemListTake;
    let keywords = this.searchItemKeywords;

    this.mstArticleItemService.getPaginatedArticleItemList(this.token, this.branchId, column, skip, take, keywords).subscribe(
      data => {

        setTimeout(() => {
          if (data["length"] > 0) {
            for (let i = 0; i <= data["length"] - 1; i++) {
              this.items.push({
                Id: data[i].Id,
                ArticleId: data[i].ArticleId,
                ArticleItem: data[i].ArticleItem,
                BranchId: data[i].BranchId,
                Branch: data[i].Branch,
                InventoryCode: data[i].InventoryCode,
                Quantity: data[i].Quantity,
                Cost: data[i].Cost
              });
            }
          }
        }, 500);

        console.log(this.items);

      }
    );
  }

  async openModal(item) {
    console.log(item);
    let trnSalesOrderItemModel: TrnSalesOrderItemModel = new TrnSalesOrderItemModel();
    trnSalesOrderItemModel.Id = 0;
    trnSalesOrderItemModel.SOId = this.sOModel.Id;
    trnSalesOrderItemModel.ItemId = item.ArticleId;
    trnSalesOrderItemModel.ItemManualCode = item.ArticleItem.Article.ManualCode;
    trnSalesOrderItemModel.ItemSKUCode = item.ArticleItem.SKUCode;
    trnSalesOrderItemModel.ItemBarCode = item.ArticleItem.Article.BarCode;
    trnSalesOrderItemModel.ItemDescription = item.ArticleItem.Description;
    trnSalesOrderItemModel.UnitId = item.ArticleItem.UnitId;
    trnSalesOrderItemModel.ItemInventoryId = null;
    trnSalesOrderItemModel.ItemInventoryCode = "";
    trnSalesOrderItemModel.Particulars = "";
    trnSalesOrderItemModel.Quantity = 1;
    trnSalesOrderItemModel.Price = item.ArticleItem.Price;
    trnSalesOrderItemModel.DiscountId = this.sOModel.DiscountId;
    trnSalesOrderItemModel.DiscountRate = this.sOModel.DiscountRate;
    trnSalesOrderItemModel.DiscountAmount = 0;
    trnSalesOrderItemModel.NetPrice = item.ArticleItem.Price;
    trnSalesOrderItemModel.Amount = item.ArticleItem.Price;
    trnSalesOrderItemModel.VATId = item.ArticleItem.SIVATId;
    trnSalesOrderItemModel.WTAXId = item.ArticleItem.WTAXId;
    console.log(trnSalesOrderItemModel);
    const modal = await this.modalCtrl.create({

      component: SoItemDetailComponent,
      componentProps: {
        soData: this.sOModel,
        itemData: trnSalesOrderItemModel
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data !== null) {
        let newItem = data.data;
        this.soItems.push(newItem);
      }
    });

    return await modal.present();
  }
  async close() {
    await this.modalCtrl.dismiss({ status: 200 });
  }
  ngOnInit() {
    this.storage.get("branchId").then(
      result => {
        let branchId = result;
        console.log(branchId);
        if (branchId) {
          this.branchId = branchId;
        }
      }
    )
    this.storage.get("access_token").then(
      result => {
        let token = result;
        console.log(token);
        if (token) {
          this.token = token;
          this.getArticleItemList();
        }
      }
    )
  }
}
