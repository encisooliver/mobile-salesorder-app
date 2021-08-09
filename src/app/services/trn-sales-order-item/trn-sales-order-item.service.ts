import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../settings/app-settings';
import { TrnSalesOrderItemModel } from './../../models/trn-sales-order-item.model';

@Injectable({
  providedIn: 'root'
})
export class TrnSalesOrderItemService {

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
}
