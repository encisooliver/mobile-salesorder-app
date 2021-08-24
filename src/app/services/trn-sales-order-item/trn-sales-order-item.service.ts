import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../settings/app-settings';
import { TrnSalesOrderItemModel } from './../../models/trn-sales-order-item.model';
import { Storage } from '@ionic/storage-angular';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TrnSalesOrderItemService {
  public defaultAPIURLHost: string = this.appSettings.APIURLHost;
  public options: any;
  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient,
    private storage: Storage,
    private decimalPipe: DecimalPipe,
  ) {
    this.storage.get("access_token").then(
      result => {
        let token = result;
        console.log(token);
        if (token) {
          this.options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          }
        }
      }
    )
  }


  public getSalesOrderItemListBySalesOrder(SOId: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let salesOrderItemListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSalesOrderItemAPI/list/" + SOId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              salesOrderItemListObservableArray.push({
                Id: results[i].Id,
                SOId: results[i].SOId,
                ItemId: results[i].ItemId,
                ItemManualCode: results[i].Item.Article.ManualCode,
                ItemSKUCode: results[i].Item.SKUCode,
                ItemBarCode: results[i].Item.BarCode,
                ItemDescription: results[i].Item.Description,
                ItemInventoryId: results[i].ItemInventoryId,
                ItemInventoryCode: results[i].ItemInventory.InventoryCode,
                Particulars: results[i].Particulars,
                Quantity: results[i].Quantity,
                UnitId: results[i].UnitId,
                UnitCode: results[i].Unit.UnitCode,
                UnitManualCode: results[i].Unit.ManualCode,
                UnitName: results[i].Unit.Unit,
                Price: results[i].Price,
                DiscountId: results[i].DiscountId,
                DiscountName: results[i].Discount.Discount,
                DiscountRate: results[i].DiscountRate,
                DiscountAmount: results[i].DiscountAmount,
                NetPrice: results[i].NetPrice,
                Amount: results[i].Amount,
                VATId: results[i].VATId,
                VATTaxCode: results[i].VAT.TaxCode,
                VATTaxManualCode: results[i].VAT.ManualCode,
                VATTaxDescription: results[i].VAT.TaxDescription,
                VATRate: results[i].VATRate,
                VATAmount: results[i].VATAmount,
                WTAXId: results[i].WTAXId,
                WTAXTaxCode: results[i].WTAX.TaxCode,
                WTAXTaxManualCode: results[i].WTAX.ManualCode,
                WTAXTaxDescription: results[i].WTAX.TaxDescription,
                WTAXRate: results[i].WTAXRate,
                WTAXAmount: results[i].WTAXAmount,
                BaseQuantity: results[i].BaseQuantity,
                BaseUnitId: results[i].UnitId,
                BaseUnitCode: results[i].BaseUnit.UnitCode,
                BaseUnitManualCode: results[i].BaseUnit.ManualCode,
                BaseUnitName: results[i].BaseUnit.Unit,
                BaseNetPrice: results[i].BaseNetPrice,
                BaseAmount: results[i].BaseAmount,
                LineTimeStamp: results[i].LineTimeStamp
              });
            }
          }

          observer.next(salesOrderItemListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getSalesOrderItemDetail(id: number): Observable<TrnSalesOrderItemModel> {
    return new Observable<TrnSalesOrderItemModel>((observer) => {
      let trnSalesOrderItemModel: TrnSalesOrderItemModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSalesOrderItemAPI/detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            trnSalesOrderItemModel = {
              Id: results["Id"],
              SOId: results["SOId"],
              ItemId: results["ItemId"],
              ItemManualCode: results["Item"].Article.ManualCode,
              ItemSKUCode: results["Item"].SKUCode,
              ItemBarCode: results["Item"].BarCode,
              ItemDescription: results["Item"].Description,
              ItemInventoryId: results["ItemInventoryId"],
              ItemInventoryCode: results["ItemInventory"].InventoryCode,
              Particulars: results["Particulars"],
              Quantity: results["Quantity"],
              UnitId: results["UnitId"],
              Price: results["Price"],
              DiscountId: results["DiscountId"],
              DiscountRate: results["DiscountRate"],
              DiscountAmount: results["DiscountAmount"],
              NetPrice: results["NetPrice"],
              Amount: results["Amount"],
              VATId: results["VATId"],
              VATRate: results["VATRate"],
              VATAmount: results["VATAmount"],
              WTAXId: results["WTAXId"],
              WTAXRate: results["WTAXRate"],
              WTAXAmount: results["WTAXAmount"],
              LineTimeStamp: results["LineTimeStamp"]
            }
          }

          observer.next(trnSalesOrderItemModel);
          observer.complete();
        }
      );
    });
  }

  public addSalesOrderItem(trnSalesOrderItemModel: TrnSalesOrderItemModel): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/TrnSalesOrderItemAPI/add", JSON.stringify(trnSalesOrderItemModel), this.options).subscribe(
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

  public updateSalesOrderItem(trnSalesOrderItemModel: TrnSalesOrderItemModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnSalesOrderItemAPI/update/" + trnSalesOrderItemModel.Id, JSON.stringify(trnSalesOrderItemModel), this.options).subscribe(
        response => {
          console.log(response);
          console.log("dota");
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

  public deleteSalesOrderItem(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/TrnSalesOrderItemAPI/delete/" + id, this.options).subscribe(
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

  public getArticleItemUnitList(articleId: number, token): Observable<any[]> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    console.log(token);
    return new Observable<any[]>((observer) => {
      let articleItemUnitListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemUnitAPI/list/" + articleId, options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              articleItemUnitListObservableArray.push({
                Id: results[i].Id,
                ArticleId: results[i].ArticleId,
                ArticleItemManualCode: results[i].ArticleItem.Article.ManualCode,
                ArticleItemSKUCode: results[i].ArticleItem.SKUCode,
                ArticleItemBarCode: results[i].ArticleItem.BarCode,
                ArticleItemDescription: results[i].ArticleItem.Description,
                UnitId: results[i].UnitId,
                UnitName: results[i].Unit.Unit,
                Multiplier: results[i].Multiplier
              });
            }
          }

          observer.next(articleItemUnitListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getArticleItemPriceList(articleId: number, token: string): Observable<any[]> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return new Observable<any[]>((observer) => {
      let articleItemPriceListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemPriceAPI/list/" + articleId, options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              articleItemPriceListObservableArray.push({
                Id: results[i].Id,
                ArticleId: results[i].ArticleId,
                ArticleItemManualCode: results[i].ArticleItem.Article.ManualCode,
                ArticleItemSKUCode: results[i].ArticleItem.SKUCode,
                ArticleItemBarCode: results[i].ArticleItem.BarCode,
                ArticleItemDescription: results[i].ArticleItem.Description,
                PriceDescription: results[i].PriceDescription,
                Price: this.decimalPipe.transform(results[i].Price, "1.2-2")
              });
            }
          }

          observer.next(articleItemPriceListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getDiscountList(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let discountListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstDiscountAPI/list", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              discountListObservableArray.push({
                Id: results[i].Id,
                DiscountCode: results[i].DiscountCode,
                ManualCode: results[i].ManualCode,
                Discount: results[i].Discount,
                DiscountRate: results[i].DiscountRate,
                AccountId: results[i].AccountId,
                AccountManualCode: results[i].Account.ManualCode,
                AccountName: results[i].Account.Account,
                CreatedByUserFullname: results[i].CreatedByUser.Fullname,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedByUserFullname: results[i].UpdatedByUser.Fullname,
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(discountListObservableArray);
          observer.complete();
        }
      );
    });
  }
  public getTaxList(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let taxListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstTaxAPI/list", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              taxListObservableArray.push({
                Id: results[i].Id,
                TaxCode: results[i].TaxCode,
                ManualCode: results[i].ManualCode,
                TaxDescription: results[i].TaxDescription,
                TaxRate: results[i].TaxRate,
                AccountId: results[i].AccountId,
                AccountManualCode: results[i].Account.ManualCode,
                AccountName: results[i].Account.Account,
                CreatedByUserFullname: results[i].CreatedByUser.Fullname,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedByUserFullname: results[i].UpdatedByUser.Fullname,
                UpdatedDateTime: results[i].UpdatedDateTime,
                ATC: results[i].ATC
              });
            }
          }

          observer.next(taxListObservableArray);
          observer.complete();
        }
      );
    });
  }


  public getCompanyDetail(id: number): Observable<any> {
    return new Observable<any>((observer) => {
      let mstCompanyModel: any;

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstCompanyAPI/detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstCompanyModel = {
              Id: results["Id"],
              CompanyCode: results["CompanyCode"],
              ManualCode: results["ManualCode"],
              Company: results["Company"],
              Address: results["Address"],
              TIN: results["TIN"],
              BusinessStyle: results["BusinessStyle"],
              SeriesRangeFrom: results["SeriesRangeFrom"],
              SeriesRangeTo: results["SeriesRangeTo"],
              IsExempt: results["IsExempt"],
              ImageURL: results["ImageURL"],
              CurrencyId: results["CurrencyId"],
              CurrencyName: results["Currency"].Currency,
              ForexGainAccountId: results["ForexGainAccountId"],
              ForexGainAccountManualCode: results["ForexGainAccount"].ManualCode,
              ForexGainAccountName: results["ForexGainAccount"].Account,
              ForexLossAccountId: results["ForexLossAccountId"],
              ForexLossAccountManualCode: results["ForexLossAccount"].ManualCode,
              ForexLossAccountName: results["ForexLossAccount"].Account,
              CostMethod: results["CostMethod"],
              IncomeAccountId: results["IncomeAccountId"],
              IncomeAccountManualCode: results["IncomeAccount"].ManualCode,
              IncomeAccountName: results["IncomeAccount"].Account,
              DefaultRRVATId: results["DefaultRRVATId"],
              DefaultRRVATManualCode: results["DefaultRRVAT"].ManualCode,
              DefaultRRVATDescription: results["DefaultRRVAT"].TaxDescription,
              DefaultRRVATRate: results["DefaultRRVAT"].TaxRate,
              DefaultRRWTaxId: results["DefaultRRWTaxId"],
              DefaultRRWTaxManualCode: results["DefaultRRWTax"].ManualCode,
              DefaultRRWTaxDescription: results["DefaultRRWTax"].TaxDescription,
              DefaultRRWTaxRate: results["DefaultRRWTax"].TaxRate,
              DefaultSIVATId: results["DefaultSIVATId"],
              DefaultSIVATManualCode: results["DefaultSIVAT"].ManualCode,
              DefaultSIVATDescription: results["DefaultSIVAT"].TaxDescription,
              DefaultSIVATRate: results["DefaultSIVAT"].TaxRate,
              DefaultSIWTaxId: results["DefaultSIWTaxId"],
              DefaultSIWTaxManualCode: results["DefaultSIWTax"].ManualCode,
              DefaultSIWTaxDescription: results["DefaultSIWTax"].TaxDescription,
              DefaultSIWTaxRate: results["DefaultSIWTax"].TaxRate,
              DefaultCVVATId: results["DefaultCVVATId"],
              DefaultCVVATManualCode: results["DefaultCVVAT"].ManualCode,
              DefaultCVVATDescription: results["DefaultCVVAT"].TaxDescription,
              DefaultCVVATRate: results["DefaultCVVAT"].TaxRate,
              DefaultCVWTaxId: results["DefaultCVWTaxId"],
              DefaultCVWTaxManualCode: results["DefaultCVWTax"].ManualCode,
              DefaultCVWTaxDescription: results["DefaultCVWTax"].TaxDescription,
              DefaultCVWTaxRate: results["DefaultCVWTax"].TaxRate,
              DefaultCIVATId: results["DefaultCIVATId"],
              DefaultCIVATManualCode: results["DefaultCIVAT"].ManualCode,
              DefaultCIVATDescription: results["DefaultCIVAT"].TaxDescription,
              DefaultCIVATRate: results["DefaultCIVAT"].TaxRate,
              DefaultCIWTaxId: results["DefaultCIWTaxId"],
              DefaultCIWTaxManualCode: results["DefaultCIWTax"].ManualCode,
              DefaultCIWTaxDescription: results["DefaultCIWTax"].TaxDescription,
              DefaultCIWTaxRate: results["DefaultCIWTax"].TaxRate,
              SalesInvoiceCheckedByUserId: results["SalesInvoiceCheckedByUserId"],
              SalesInvoiceCheckedByUserFullname: results["SalesInvoiceCheckedByUser"].Fullname,
              SalesInvoiceApprovedByUserId: results["SalesInvoiceApprovedByUserId"],
              SalesInvoiceApprovedByUserFullname: results["SalesInvoiceApprovedByUser"].Fullname,
              IsLocked: results["IsLocked"],
              CreatedByUserFullname: results["CreatedByUser"].Fullname,
              CreatedDateTime: results["CreatedDateTime"],
              UpdatedByUserFullname: results["UpdatedByUser"].Fullname,
              UpdatedDateTime: results["UpdatedDateTime"],
              NatureOfIncome: results["NatureOfIncome"],
              InvoiceReceiptName: results["InvoiceReceiptName"],
              InvoiceReceiptPhrase: results["InvoiceReceiptPhrase"],
              CollectionReceiptName: results["CollectionReceiptName"],
              CollectionReceiptPhrase: results["CollectionReceiptPhrase"],
              AcknowledgementReceiptNo: results["AcknowledgementReceiptNo"],
              DateIssued: results["DateIssued"],
              ZipCode: results["ZipCode"],
              DefaultArticleAccountGroupForItem: results["DefaultArticleAccountGroupForItem"],
              DefaultAccountPayableForSupplier: results["DefaultAccountPayableForSupplier"],
              DefaultAccountReceivableForCustomer: results["DefaultAccountReceivableForCustomer"],
              DefaultDepreciateAccountId: results["DefaultDepreciateAccountId"],
              DefaultDepreciateArticleId: results["DefaultDepreciateArticleId"]
            }
          }

          observer.next(mstCompanyModel);
          observer.complete();
        }
      );
    });
  }
}
