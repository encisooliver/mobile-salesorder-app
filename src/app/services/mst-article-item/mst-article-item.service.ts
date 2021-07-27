import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../settings/app-settings';
import { MstArticleItemModel } from './../../models/mst-article-item.model';

@Injectable({
  providedIn: 'root'
})
export class MstArticleItemService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;
  public options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  };

  public getPaginatedArticleItemList(column: string, skip: number, take: number, keywords: string): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let itemListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemAPI/list/paginated/" + column + "/" + skip + "/" + take + "?keywords=" + keywords, this.options).subscribe(
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
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(itemListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getArticleItemList(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let itemListObservableArray =[];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemAPI/list", this.options).subscribe(
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
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(itemListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getLockedArticleItemList(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let itemListObservableArray =[];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemAPI/list/locked", this.options).subscribe(
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
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(itemListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getInventoryArticleItemList(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let itemListObservableArray =[];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemAPI/list/inventory", this.options).subscribe(
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
                ArticleCategory: results[i].Category,
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
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(itemListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getInventoryArticleItemListExceptByArticle(articleId: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let itemListObservableArray =[];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemAPI/list/inventory/exceptByArticle/" + articleId, this.options).subscribe(
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
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(itemListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getPaginatedNonInventoryArticleItemList(column: string, skip: number, take: number, keywords: string): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let itemListObservableArray =[];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemAPI/list/non-inventory/paginated/" + column + "/" + skip + "/" + take + "?keywords=" + keywords, this.options).subscribe(
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
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(itemListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getNonInventoryArticleItemList(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let itemListObservableArray =[];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemAPI/list/non-inventory", this.options).subscribe(
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
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(itemListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getProducedArticleItemList(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let itemListObservableArray =[];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemAPI/list/produced", this.options).subscribe(
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
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(itemListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getComponentArticleItemList(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let itemListObservableArray =[];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemAPI/list/component", this.options).subscribe(
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
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(itemListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getArticleItemDetail(id: number): Observable<MstArticleItemModel> {
    return new Observable<MstArticleItemModel>((observer) => {
      let mstArticleItemModel: MstArticleItemModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemAPI/detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstArticleItemModel = {
              Id: results["Id"],
              ArticleId: results["ArticleId"],
              ArticleCode: results["Article"].ArticleCode,
              ArticleManualCode: results["ArticleManualCode"],
              ArticleParticulars: results["ArticleParticulars"],
              SKUCode: results["SKUCode"],
              BarCode: results["BarCode"],
              Description: results["Description"],
              UnitId: results["UnitId"],
              Category: results["Category"],
              IsInventory: results["IsInventory"],
              ArticleAccountGroupId: results["ArticleAccountGroupId"],
              ArticleAccountGroupName: results["ArticleAccountGroup"].ArticleAccountGroup,
              AssetAccountId: results["AssetAccountId"],
              AssetAccountManualCode: results["AssetAccount"].ManualCode,
              AssetAccountName: results["AssetAccount"].Account,
              SalesAccountId: results["SalesAccountId"],
              SalesAccountManualCode: results["SalesAccount"].ManualCode,
              SalesAccountName: results["SalesAccount"].Account,
              CostAccountId: results["CostAccountId"],
              CostAccountManualCode: results["CostAccount"].ManualCode,
              CostAccountName: results["CostAccount"].Account,
              ExpenseAccountId: results["ExpenseAccountId"],
              ExpenseAccountManualCode: results["ExpenseAccount"].ManualCode,
              ExpenseAccountName: results["ExpenseAccount"].Account,
              Price: results["Price"],
              RRVATId: results["RRVATId"],
              SIVATId: results["SIVATId"],
              WTAXId: results["WTAXId"],
              Kitting: results["Kitting"],
              ProductionCost: results["ProductionCost"],
              IsLocked: results["IsLocked"],
              CreatedByUserFullname: results["CreatedByUser"].Fullname,
              CreatedDateTime: results["CreatedDateTime"],
              UpdatedByUserFullname: results["UpdatedByUser"].Fullname,
              UpdatedDateTime: results["UpdatedDateTime"],
              DateAcquired: new Date(results["DateAcquired"]),
              SalvageValue: results["SalvageValue"],
              UsefulLife: results["UsefulLife"]
            }
          }

          observer.next(mstArticleItemModel);
          observer.complete();
        }
      );
    });
  }

  public addArticleItem(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/MstArticleItemAPI/add", JSON.stringify(""), this.options).subscribe(
        response => {
          let id = response;
          observer.next([true, id]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error]);
          observer.complete();
        }
      );
    });
  }

  public saveArticleItem(trnArticleItemModel: MstArticleItemModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstArticleItemAPI/save/" + trnArticleItemModel.Id, JSON.stringify(trnArticleItemModel), this.options).subscribe(
        response => {
          observer.next([true, ""]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error]);
          observer.complete();
        }
      );
    });
  }

  public lockArticleItem(trnArticleItemModel: MstArticleItemModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstArticleItemAPI/lock/" + trnArticleItemModel.Id, JSON.stringify(trnArticleItemModel), this.options).subscribe(
        response => {
          observer.next([true, ""]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error]);
          observer.complete();
        }
      );
    });
  }

  public unlockArticleItem(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstArticleItemAPI/unlock/" + id, JSON.stringify(""), this.options).subscribe(
        response => {
          observer.next([true, ""]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error]);
          observer.complete();
        }
      );
    });
  }

  public deleteArticleItem(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/MstArticleItemAPI/delete/" + id, this.options).subscribe(
        response => {
          observer.next([true, ""]);
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
