import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../settings/app-settings';
import { TrnSalesOrderModel } from './../../models/trn-sales-order.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;
  public options: any;
  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient,
    private storage: Storage
  ) {
    this.storage.get("access_token").then(
      result => {
        let token = result;
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
 

  public getSetup(token: string): Observable<any[]> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return new Observable<any[]>((observer) => {
      let salesOrderListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/EasyfisMobileAPI/easyfismobile/", options).subscribe(
        response => {
          let results = response;
          this.storage.set('setup', results);
          console.log(response);
          // if (results["length"] > 0) {
          //   for (let i = 0; i <= results["length"] - 1; i++) {
          //     salesOrderListObservableArray.push({
          //       Id: results[i].Id,
          //       BranchManualCode: results[i].BranchManualCode,
          //       BranchName: results[i].BranchName,
          //       CurrencyId: results[i].CurrencyId,
          //       CurrencyManualCode: results[i].CurrencyManualCode,
          //       ExchangeRate: results[i].ExchangeRate,
          //       ExchangeCurrency: results[i].ExchangeCurrency,
          //       ExchangeCurrencyManualCode: results[i].ExchangeCurrencyManualCode,
          //       SONumber: results[i].SONumber,

          //       SODate: results[i].SODate,
          //       ManualNumber: results[i].ManualNumber,
          //       DocumentReference: results[i].DocumentReference,
          //       CustomerId: results[i].CustomerId,
          //       CustomerName: results[i].CustomerName,
          //       TermId: results[i].TermId,
          //       DiscountId: results[i].DiscountId,
          //       DiscountRate: results[i].DiscountRate,
          //       DateNeeded: results[i].DateNeeded,
          //       Remarks: results[i].Remarks,

          //       Amount: results[i].Amount,
          //       Status: results[i].Status,

          //       SoldByUserId: results[i].SoldByUserId,
          //       SoldByUserFullname: results[i].SoldByUserFullname,
          //       PreparedByUserId: results[i].PreparedByUserId,
          //       PreparedByUserFullname: results[i].PreparedByUserFullname,
          //       CheckedByUserId: results[i].CheckedByUserId,
          //       CheckedByUserFullname: results[i].CheckedByUserFullname,
          //       ApprovedByUserId: results[i].ApprovedByUserId,
          //       ApprovedByUserFullname: results[i].ApprovedByUserFullname,
          //       IsCancelled: results[i].IsCancelled,
          //       IsPrinted: results[i].IsPrinted,
          //       IsLocked: results[i].IsLocked,
          //       CreatedByUserFullname: results[i].CreatedByUserFullname,
          //       CreatedDateTime: results[i].CreatedDateTime,
          //       UpdatedByUserFullname: results[i].UpdatedByUserFullname,
          //       UpdatedDateTime: results[i].UpdatedDateTime,
          //       SOItems: results[i].SOItems
          //     });
          //   }
          // }

          observer.next(salesOrderListObservableArray);
          observer.complete();
        }
      );
    });
  }
  public getSOListByDate(token: string, startDate: string, endDate: string): Observable<any[]> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return new Observable<any[]>((observer) => {
      let salesOrderListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/EasyfisMobileSalesOrderAPI/list/byDateRange/" + startDate + "/" + endDate, options).subscribe(
        response => {
          let results = response;
          console.log(response);
          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              salesOrderListObservableArray.push({
                Id: results[i].Id,
                BranchManualCode: results[i].BranchManualCode,
                BranchName: results[i].BranchName,
                CurrencyId: results[i].CurrencyId,
                CurrencyManualCode: results[i].CurrencyManualCode,
                ExchangeRate: results[i].ExchangeRate,
                ExchangeCurrency: results[i].ExchangeCurrency,
                ExchangeCurrencyManualCode: results[i].ExchangeCurrencyManualCode,
                SONumber: results[i].SONumber,

                SODate: results[i].SODate,
                ManualNumber: results[i].ManualNumber,
                DocumentReference: results[i].DocumentReference,
                CustomerId: results[i].CustomerId,
                CustomerName: results[i].CustomerName,
                TermId: results[i].TermId,
                DiscountId: results[i].DiscountId,
                DiscountRate: results[i].DiscountRate,
                DateNeeded: results[i].DateNeeded,
                Remarks: results[i].Remarks,

                Amount: results[i].Amount,
                Status: results[i].Status,

                SoldByUserId: results[i].SoldByUserId,
                SoldByUserFullname: results[i].SoldByUserFullname,
                PreparedByUserId: results[i].PreparedByUserId,
                PreparedByUserFullname: results[i].PreparedByUserFullname,
                CheckedByUserId: results[i].CheckedByUserId,
                CheckedByUserFullname: results[i].CheckedByUserFullname,
                ApprovedByUserId: results[i].ApprovedByUserId,
                ApprovedByUserFullname: results[i].ApprovedByUserFullname,
                IsCancelled: results[i].IsCancelled,
                IsPrinted: results[i].IsPrinted,
                IsLocked: results[i].IsLocked,
                CreatedByUserFullname: results[i].CreatedByUserFullname,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedByUserFullname: results[i].UpdatedByUserFullname,
                UpdatedDateTime: results[i].UpdatedDateTime,
                SOItems: results[i].SOItems
              });
            }
          }

          observer.next(salesOrderListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public addSalesOrder(trnSalesOrderModel: TrnSalesOrderModel): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/EasyfisMobileSalesOrderAPI/add", JSON.stringify(trnSalesOrderModel), this.options).subscribe(
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

  public saveSalesOrder(trnSalesOrderModel: TrnSalesOrderModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/EasyfisMobileSalesOrderAPI/save/" + trnSalesOrderModel.Id, JSON.stringify(trnSalesOrderModel), this.options).subscribe(
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

  public deleteSalesOrder(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/TrnSalesOrderAPI/delete/" + id, this.options).subscribe(
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
