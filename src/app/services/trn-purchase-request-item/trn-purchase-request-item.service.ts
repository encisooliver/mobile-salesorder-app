import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../settings/app-settings';
import { TrnPurchaseRequestItemModel } from './../../models/trn-purchase-request-item.model';

@Injectable({
  providedIn: 'root'
})
export class TrnPurchaseRequestItemService {

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

  public getPurchaseRequestItemListByPurchaseRequest(INId: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let purchaseRequestItemListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnPurchaseRequestItemAPI/list/" + INId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              purchaseRequestItemListObservableArray.push({
                Id: results[i].Id,
                INId: results[i].INId,
                ItemId: results[i].ItemId,
                ItemManualCode: results[i].Item.Article.ManualCode,
                ItemSKUCode: results[i].Item.SKUCode,
                ItemBarCode: results[i].Item.BarCode,
                ItemDescription: results[i].Item.Description,
                Particulars: results[i].Particulars,
                Quantity: results[i].Quantity,
                UnitId: results[i].UnitId,
                UnitCode: results[i].Unit.UnitCode,
                UnitManualCode: results[i].Unit.ManualCode,
                UnitName: results[i].Unit.Unit,
                Cost: results[i].Cost,
                Amount: results[i].Amount,
                BaseAmount: results[i].BaseAmount,
                BaseQuantity: results[i].BaseQuantity,
                BaseUnitId: results[i].UnitId,
                BaseUnitCode: results[i].BaseUnit.UnitCode,
                BaseUnitManualCode: results[i].BaseUnit.ManualCode,
                BaseUnitName: results[i].BaseUnit.Unit,
                BaseCost: results[i].BaseCost,
              });
            }
          }

          observer.next(purchaseRequestItemListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getPurchaseRequestItemDetail(id: number): Observable<TrnPurchaseRequestItemModel> {
    return new Observable<TrnPurchaseRequestItemModel>((observer) => {
      let trnPurchaseRequestItemModel: TrnPurchaseRequestItemModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnPurchaseRequestItemAPI/detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            trnPurchaseRequestItemModel = {
              Id: results["Id"],
              PRId: results["PRId"],
              ItemId: results["ItemId"],
              ItemManualCode: results["Item"].Article.ManualCode,
              ItemSKUCode: results["Item"].SKUCode,
              ItemBarCode: results["Item"].BarCode,
              ItemDescription: results["Item"].Description,
              Particulars: results["Particulars"],
              Quantity: results["Quantity"],
              UnitId: results["UnitId"],
              Cost: results["Cost"],
              Amount: results["Amount"]
            }
          }

          observer.next(trnPurchaseRequestItemModel);
          observer.complete();
        }
      );
    });
  }

  public addPurchaseRequestItem(trnPurchaseRequestItemModel: TrnPurchaseRequestItemModel): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/TrnPurchaseRequestItemAPI/add", JSON.stringify(trnPurchaseRequestItemModel), this.options).subscribe(
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

  public updatePurchaseRequestItem(trnPurchaseRequestItemModel: TrnPurchaseRequestItemModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnPurchaseRequestItemAPI/update/" + trnPurchaseRequestItemModel.Id, JSON.stringify(trnPurchaseRequestItemModel), this.options).subscribe(
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

  public deletePurchaseRequestItem(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/TrnPurchaseRequestItemAPI/delete/" + id, this.options).subscribe(
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
