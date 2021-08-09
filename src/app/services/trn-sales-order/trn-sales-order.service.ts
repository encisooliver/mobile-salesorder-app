import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../settings/app-settings';
import { TrnSalesOrderModel } from './../../models/trn-sales-order.model';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class TrnSalesOrderService {
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
        console.log( token );
        if(token){
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

  public getSOListByDate(token: string, startDate: string, endDate: string): Observable<any[]> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return new Observable<any[]>((observer) => {
      let salesOrderListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSalesOrderAPI/list/byDateRange/" + startDate + "/" + endDate, options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              salesOrderListObservableArray.push({
                Id: results[i].Id,
                ExchangeCurrency: results[i].Currency.Currency,
                CurrencyManualCode: results[i].Currency.ManualCode,
                SONumber: results[i].SONumber,
                SODate: results[i].SODate,
                ManualNumber: results[i].ManualNumber,
                DocumentReference: results[i].DocumentReference,
                CustomerManualCode: results[i].Customer.Article.ManualCode,
                CustomerName: results[i].Customer.Customer,
                Remarks: results[i].Remarks,
                Amount: results[i].Amount,
                Status: results[i].Status,
                IsLocked: results[i].IsLocked,
                CreatedByUserFullname: results[i].CreatedByUser.Fullname,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedByUserFullname: results[i].UpdatedByUser.Fullname,
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(salesOrderListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getSalesOrderListByCustomer(customerId: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let salesOrderListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSalesOrderAPI/list/byCustomer/" + customerId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              salesOrderListObservableArray.push({
                Id: results[i].Id,
                BranchId: results[i].BranchId,
                BranchCode: results[i].Branch.BranchCode,
                BranchManualCode: results[i].Branch.ManualCode,
                BranchName: results[i].Branch.Branch,
                ExchangeCurrency: results[i].Currency.Currency,
                CurrencyManualCode: results[i].Currency.ManualCode,
                SONumber: results[i].SONumber,
                SODate: results[i].SODate,
                ManualNumber: results[i].ManualNumber,
                DocumentReference: results[i].DocumentReference,
                CustomerId: results[i].CustomerId,
                CustomerManualCode: results[i].Customer.Article.ManualCode,
                CustomerName: results[i].Customer.Customer,
                CustomerReceivableAccountId: results[i].Customer.ReceivableAccountId,
                CustomerReceivableAccountCode: results[i].Customer.ReceivableAccount.AccountCode,
                CustomerReceivableAccountManualCode: results[i].Customer.ReceivableAccount.ManualCode,
                CustomerReceivableAccountName: results[i].Customer.ReceivableAccount.Account,
                Remarks: results[i].Remarks,
                Amount: results[i].Amount,
                Status: results[i].Status
              });
            }
          }

          observer.next(salesOrderListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getSalesOrderListByCustomerByCurrency(customerId: number, currencyId: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let salesOrderListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSalesOrderAPI/list/byCustomer/" + customerId + "/" + currencyId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              salesOrderListObservableArray.push({
                Id: results[i].Id,
                BranchId: results[i].BranchId,
                BranchCode: results[i].Branch.BranchCode,
                BranchManualCode: results[i].Branch.ManualCode,
                BranchName: results[i].Branch.Branch,
                ExchangeCurrency: results[i].Currency.Currency,
                CurrencyManualCode: results[i].Currency.ManualCode,
                SONumber: results[i].SONumber,
                SODate: results[i].SODate,
                ManualNumber: results[i].ManualNumber,
                DocumentReference: results[i].DocumentReference,
                CustomerId: results[i].CustomerId,
                CustomerManualCode: results[i].Customer.Article.ManualCode,
                CustomerName: results[i].Customer.Customer,
                CustomerReceivableAccountId: results[i].Customer.ReceivableAccountId,
                CustomerReceivableAccountCode: results[i].Customer.ReceivableAccount.AccountCode,
                CustomerReceivableAccountManualCode: results[i].Customer.ReceivableAccount.ManualCode,
                CustomerReceivableAccountName: results[i].Customer.ReceivableAccount.Account,
                Remarks: results[i].Remarks,
                Amount: results[i].Amount,
                Status: results[i].Status
              });
            }
          }

          observer.next(salesOrderListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getSalesOrderDetail(id: number): Observable<TrnSalesOrderModel> {
    return new Observable<TrnSalesOrderModel>((observer) => {
      let trnSalesOrderModel: TrnSalesOrderModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSalesOrderAPI/detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            trnSalesOrderModel = {
              Id: results["Id"],
              BranchManualCode: results["Branch"].ManualCode,
              BranchName: results["Branch"].Branch,
              CurrencyId: results["CurrencyId"],
              CurrencyManualCode: results["Currency"].ManualCode,
              ExchangeRate: results["ExchangeRate"],
              ExchangeCurrency: results["Currency"].Currency,
              ExchangeCurrencyManualCode: results["Currency"].ManualCode,
              SONumber: results["SONumber"],
              SODate: new Date(results["SODate"]),
              ManualNumber: results["ManualNumber"],
              DocumentReference: results["DocumentReference"],
              CustomerId: results["CustomerId"],
              CustomerName: results["Customer"].Customer,
              TermId: results["TermId"],
              DiscountId: results["Customer"].DiscountId,
              DiscountRate: results["Customer"].Discount.DiscountRate,
              DateNeeded: new Date(results["DateNeeded"]),
              Remarks: results["Remarks"],
              SoldByUserId: results["SoldByUserId"],
              SoldByUserFullname: results["SoldByUser"].Fullname,
              PreparedByUserId: results["PreparedByUserId"],
              PreparedByUserFullname: results["PreparedByUser"].Fullname,
              CheckedByUserId: results["CheckedByUserId"],
              CheckedByUserFullname: results["CheckedByUser"].Fullname,
              ApprovedByUserId: results["ApprovedByUserId"],
              ApprovedByUserFullname: results["ApprovedByUser"].Fullname,
              Amount: results["Amount"],
              Status: results["Status"],
              IsCancelled: results["IsCancelled"],
              IsPrinted: results["IsPrinted"],
              IsLocked: results["IsLocked"],
              CreatedByUserFullname: results["CreatedByUser"].Fullname,
              CreatedDateTime: results["CreatedDateTime"],
              UpdatedByUserFullname: results["UpdatedByUser"].Fullname,
              UpdatedDateTime: results["UpdatedDateTime"]
            }
          }

          observer.next(trnSalesOrderModel);
          observer.complete();
        }
      );
    });
  }

  public getCurrencyExchange(): Observable<any[]> {
  
    return new Observable<any[]>((observer) => {
      let currencyExchangeListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstCurrencyExchangeAPI/list", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              currencyExchangeListObservableArray.push({
                Id: results[i].Id,
                CurrencyId: results[i].CurrencyId,
                CurrencyManualCode: results[i].Currency.ManualCode,
                CurrencyName: results[i].Currency.Currency,
                ExchangeCurrencyId: results[i].ExchangeCurrencyId,
                ExchangeCurrency: results[i].ExchangeCurrency.Currency,
                ExchangeCurrencyManualCode: results[i].ExchangeCurrency.ManualCode,
                ExchangeDate: results[i].ExchangeDate,
                ExchangeRate: results[i].ExchangeRate
              });
            }
          }

          observer.next(currencyExchangeListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getTermList(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let termListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstTermAPI/list", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              termListObservableArray.push({
                Id: results[i].Id,
                TermCode: results[i].TermCode,
                ManualCode: results[i].ManualCode,
                Term: results[i].Term,
                NumberOfDays: results[i].NumberOfDays,
                CreatedByUserFullname: results[i].CreatedByUser.Fullname,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedByUserFullname: results[i].UpdatedByUser.Fullname,
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(termListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getCodeTableListByCategory(category: string): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let codeTableListObservableArray =[];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstCodeTableAPI/transactionList/" + category, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              codeTableListObservableArray.push({
                Id: results[i].Id,
                Code: results[i].Code,
                CodeValue: results[i].CodeValue,
                Category: results[i].Category
              });
            }
          }

          observer.next(codeTableListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public addSalesOrder(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/TrnSalesOrderAPI/add", JSON.stringify(""), this.options).subscribe(
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
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnSalesOrderAPI/save/" + trnSalesOrderModel.Id, JSON.stringify(trnSalesOrderModel), this.options).subscribe(
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

  public lockSalesOrder(trnSalesOrderModel: TrnSalesOrderModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnSalesOrderAPI/lock/" + trnSalesOrderModel.Id, JSON.stringify(trnSalesOrderModel), this.options).subscribe(
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

  public unlockSalesOrder(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnSalesOrderAPI/unlock/" + id, JSON.stringify(""), this.options).subscribe(
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

  public cancelSalesOrder(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnSalesOrderAPI/cancel/" + id, JSON.stringify(""), this.options).subscribe(
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

  public printSalesOrder(id: number, paperSize: String): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      let printOptions: any = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }),
        responseType: "blob"
      };

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSalesOrderAPI/print/" + id + "/" + paperSize, printOptions).subscribe(
        response => {
          let results = new Blob([response], { type: 'application/pdf' });

          observer.next(results);
          observer.complete();
        }
      );
    });
  }
}
