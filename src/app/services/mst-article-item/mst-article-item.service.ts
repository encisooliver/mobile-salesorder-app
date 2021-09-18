import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../settings/app-settings';
import { ItemModel } from '../../models/item.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class MstArticleItemService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient,
    private storage: Storage
  ) {
  }

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;

  public getPaginatedArticleItemList(token: string, branchId:number, column: string, skip: number, take: number, keywords: string): Observable<any[]> {
    
    let option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return new Observable<any[]>((observer) => {
      let itemListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemInventoryAPI/list/paginated/" + 3 + "/" + column + "/" + skip + "/" + take + "?keywords=" + keywords, option).subscribe(
        response => {
          let results = response;
          console.log(results);
          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              itemListObservableArray.push({
                Id: results[i].Id,
                ArticleId: results[i].ArticleId,
                ArticleItem: results[i].ArticleItem,
                BranchId: results[i].BranchId,
                Branch: results[i].Branch,
                InventoryCode: results[i].InventoryCode,
                Quantity: results[i].Quantity,
                Cost: results[i].Cost
              });
            }
          }

          observer.next(itemListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getLockedArticleItemList(token:string): Observable<any[]> {
     
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return new Observable<any[]>((observer) => {
      let itemListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemAPI/list/locked", options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              itemListObservableArray.push({
                Id: results[i].Id,
                ArticleId: results[i].ArticleId,
                ArticleCode: results[i].Article.ArticleCode,
                ArticleManualCode: results[i].ArticleManualCode,
                ArticleParticulars: results[i].ArticleParticulars,
                Article: results[i].Article.Article,
                SKUCode: results[i].SKUCode,
                BarCode: results[i].BarCode,
                Description: results[i].Description,
                UnitId: results[i].UnitId,
                UnitCode: results[i].Unit.UnitCode,
                UnitManualCode: results[i].Unit.ManualCode,
                UnitName: results[i].Unit.Unit,
                Category: results[i].Category,
                IsInventory: results[i].IsInventory,
                ArticleAccountGroupId: results[i].ArticleAccountGroupId,
                ArticleAccountGroupCode: results[i].ArticleAccountGroup.ArticleAccountGroupCode,
                ArticleAccountGroupManualCode: results[i].ArticleAccountGroup.ManualCode,
                ArticleAccountGroupName: results[i].ArticleAccountGroup.ArticleAccountGroup,
                AssetAccountId: results[i].AssetAccountId,
                AssetAccountCode: results[i].AssetAccount.AccountCode,
                AssetAccountManualCode: results[i].AssetAccount.ManualCode,
                AssetAccountName: results[i].AssetAccount.Account,
                SalesAccountId: results[i].SalesAccountId,
                SalesAccountCode: results[i].SalesAccount.AccountCode,
                SalesAccountManualCode: results[i].SalesAccount.ManualCode,
                SalesAccountName: results[i].SalesAccount.Account,
                CostAccountId: results[i].CostAccountId,
                CostAccountCode: results[i].CostAccount.AccountCode,
                CostAccountManualCode: results[i].CostAccount.ManualCode,
                CostAccountName: results[i].CostAccount.Account,
                ExpenseAccountId: results[i].ExpenseAccountId,
                ExpenseAccountCode: results[i].ExpenseAccount.AccountCode,
                ExpenseAccountManualCode: results[i].ExpenseAccount.ManualCode,
                ExpenseAccountName: results[i].ExpenseAccount.Account,
                Price: results[i].Price,
                RRVATId: results[i].RRVATId,
                RRVATTaxCode: results[i].RRVAT.TaxCode,
                RRVATTaxManualCode: results[i].RRVAT.ManualCode,
                RRVATTaxDescription: results[i].RRVAT.TaxDescription,
                SIVATId: results[i].SIVATId,
                SIVATTaxCode: results[i].SIVAT.TaxCode,
                SIVATTaxManualCode: results[i].SIVAT.ManualCode,
                SIVATTaxDescription: results[i].SIVAT.TaxDescription,
                WTAXId: results[i].WTAXId,
                WTAXTaxCode: results[i].WTAX.TaxCode,
                WTAXTaxManualCode: results[i].WTAX.ManualCode,
                WTAXTaxDescription: results[i].WTAX.TaxDescription,
                Kitting: results[i].Kitting,
                ProductionCost: results[i].ProductionCost,
                IsLocked: results[i].IsLocked,
                CreatedByUserFullname: results[i].CreatedByUser.Fullname,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedByUserFullname: results[i].UpdatedByUser.Fullname,
                UpdatedDateTime: results[i].UpdatedDateTime,
              });
            }
          }

          observer.next(itemListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getItemList(token: string): Observable<any[]> {
    
    let option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return new Observable<any[]>((observer) => {
      this.httpClient.get(this.defaultAPIURLHost + "/api/EasyfisMobileAPI/itemLists", option).subscribe(
        response => {
          let results = response;
          console.log(results);
          this.storage.set('items', results);
          observer.next([true, "Success"]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error]);
          observer.complete();
        }
      );
    });
  }
 
}
