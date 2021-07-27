import { Component, OnInit } from '@angular/core';
import { MstArticleItemService } from 'src/app/services/mst-article-item/mst-article-item.service';
import { TrnPurchaseRequestItemService } from 'src/app/services/trn-purchase-request-item/trn-purchase-request-item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {

  constructor(
    private mstArticleItemService: MstArticleItemService,
    private trnPurchaseRequestItemService: TrnPurchaseRequestItemService
  ) { }

  public articleItemListPageIndex: number = 15;
  public itemListSkip: number = 0;
  public itemListTake: number = 15;
  public searchItemKeywords: string = "";
  public searchItemColumn: string = "All"


  public isButtonAddArticleItemDisabled: boolean = false;
  public articleItemList: any[] = [];
  public getArticleItemList(): void {

    let column = this.searchItemColumn;
    let skip = this.itemListSkip;
    let take = this.itemListTake;
    let keywords = this.searchItemKeywords;

    this.mstArticleItemService.getPaginatedArticleItemList(column, skip, take, keywords).subscribe(
      data => {

        setTimeout(() => {
          if (data.length > 0) {
            for (let i = 0; i <= data.length - 1; i++) {
              this.articleItemList.push({
                Id: data[i].Id,
                ArticleId: data[i].ArticleId,
                ArticleCode: data[i].ArticleCode,
                ArticleManualCode: data[i].ArticleManualCode,
                ArticleParticulars: data[i].ArticleParticulars,
                Article: data[i].Article,
                SKUCode: data[i].SKUCode,
                BarCode: data[i].BarCode,
                Description: data[i].Description,
                UnitId: data[i].UnitId,
                UnitCode: data[i].UnitCode,
                UnitManualCode: data[i].UnitManualCode,
                UnitName: data[i].UnitName,
                Category: data[i].Category,
                IsInventory: data[i].IsInventory,
                ArticleAccountGroupId: data[i].ArticleAccountGroupId,
                ArticleAccountGroupCode: data[i].ArticleAccountGroupCode,
                ArticleAccountGroupManualCode: data[i].ArticleAccountGroupManualCode,
                ArticleAccountGroupName: data[i].ArticleAccountGroupName,
                AssetAccountId: data[i].AssetAccountId,
                AssetAccountCode: data[i].AssetAccountCode,
                AssetAccountManualCode: data[i].AssetAccountManualCode,
                AssetAccountName: data[i].AssetAccountName,
                SalesAccountId: data[i].SalesAccountId,
                SalesAccountCode: data[i].SalesAccountCode,
                SalesAccountManualCode: data[i].SalesAccountManualCode,
                SalesAccountName: data[i].SalesAccountName,
                CostAccountId: data[i].CostAccountId,
                CostAccountCode: data[i].CostAccountCode,
                CostAccountManualCode: data[i].CostAccountManualCode,
                CostAccountName: data[i].CostAccountName,
                ExpenseAccountId: data[i].ExpenseAccountId,
                ExpenseAccountCode: data[i].ExpenseAccountCode,
                ExpenseAccountManualCode: data[i].ExpenseAccountManualCode,
                ExpenseAccountName: data[i].ExpenseAccountName,
                Price: data[i].Price,
                RRVATId: data[i].RRVATId,
                RRVATTaxCode: data[i].RRVATTaxCode,
                RRVATTaxManualCode: data[i].RRVATTaxManualCode,
                RRVATTaxDescription: data[i].RRVATTaxDescription,
                SIVATId: data[i].SIVATId,
                SIVATTaxCode: data[i].SIVATTaxCode,
                SIVATTaxManualCode: data[i].SIVATTaxManualCode,
                SIVATTaxDescription: data[i].SIVATTaxDescription,
                WTAXId: data[i].WTAXId,
                WTAXTaxCode: data[i].WTAXTaxCode,
                WTAXTaxManualCode: data[i].WTAXTaxManualCode,
                WTAXTaxDescription: data[i].WTAXTaxDescription,
                Kitting: data[i].Kitting,
                ProductionCost: data[i].ProductionCost,
                IsLocked: data[i].IsLocked
              });
            }

            // this.articleItemList = data;
          }
        }, 500);

        console.log(this.articleItemList);

      }
    );
  }

  // Sales Order
  public getPurchaseRequestItemListBySupplier() {
    let PRId: number = 0;
    

    this.trnPurchaseRequestItemService.getPurchaseRequestItemListByPurchaseRequest(PRId).subscribe(
      data => {

        setTimeout(() => {
          if (data.length > 0) {
            this.articleItemList= data;
          }
        }, 500);

      }
    );
  }

  ngOnInit() {
    this.getArticleItemList();
  }

}
