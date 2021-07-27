import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../settings/app-settings';
import { MstArticleCustomerModel } from './../../models/mst-article-customer.model';

@Injectable({
  providedIn: 'root'
})
export class MstArticleCustomerService {

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

  public getPaginatedArticleCustomerList(column: string, skip: number, take: number, keywords: string): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let customerListObservableArray =[];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleCustomerAPI/list/paginated/" + column + "/" + skip + "/" + take + "?keywords=" + keywords, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              customerListObservableArray.push({
                Id: results[i].Id,
                ArticleId: results[i].ArticleId,
                ArticleCode: results[i].Article.ArticleCode,
                ArticleManualCode: results[i].ArticleManualCode,
                ArticleParticulars: results[i].ArticleParticulars,
                Article: results[i].Article.Article,
                Customer: results[i].Customer,
                Address: results[i].Address,
                ContactPerson: results[i].ContactPerson,
                ContactNumber: results[i].ContactNumber,
                Category: results[i].Category,
                ReceivableAccountId: results[i].ReceivableAccountId,
                ReceivableAccountName: results[i].ReceivableAccount.ReceivableAccount,
                TermId: results[i].TermId,
                TermCode: results[i].Term.TermCode,
                TermManualCode: results[i].Term.ManualCode,
                TermName: results[i].Term.Term,
                CreditLimit: results[i].CreditLimit,
                IsLocked: results[i].IsLocked,
                CreatedByUserFullname: results[i].CreatedByUser.Fullname,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedByUserFullname: results[i].UpdatedByUser.Fullname,
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(customerListObservableArray);
          observer.complete();
        }
      );
    });
  }

  
  public getArticleCustomerList(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let customerListObservableArray =[];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleCustomerAPI/list", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              customerListObservableArray.push({
                Id: results[i].Id,
                ArticleId: results[i].ArticleId,
                ArticleCode: results[i].Article.ArticleCode,
                ArticleManualCode: results[i].ArticleManualCode,
                ArticleParticulars: results[i].ArticleParticulars,
                Article: results[i].Article.Article,
                Customer: results[i].Customer,
                Address: results[i].Address,
                ContactPerson: results[i].ContactPerson,
                ContactNumber: results[i].ContactNumber,
                Category: results[i].Category,
                ReceivableAccountId: results[i].ReceivableAccountId,
                ReceivableAccountName: results[i].ReceivableAccount.ReceivableAccount,
                TermId: results[i].TermId,
                TermCode: results[i].Term.TermCode,
                TermManualCode: results[i].Term.ManualCode,
                TermName: results[i].Term.Term,
                CreditLimit: results[i].CreditLimit,
                IsLocked: results[i].IsLocked,
                CreatedByUserFullname: results[i].CreatedByUser.Fullname,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedByUserFullname: results[i].UpdatedByUser.Fullname,
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(customerListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getLockedArticleCustomerList(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let customerListObservableArray =[];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleCustomerAPI/list/locked", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              customerListObservableArray.push({
                Id: results[i].Id,
                ArticleId: results[i].ArticleId,
                ArticleCode: results[i].Article.ArticleCode,
                ArticleManualCode: results[i].ArticleManualCode,
                ArticleParticulars: results[i].ArticleParticulars,
                Article: results[i].Article.Article,
                Customer: results[i].Customer,
                Address: results[i].Address,
                ContactPerson: results[i].ContactPerson,
                ContactNumber: results[i].ContactNumber,
                Category: results[i].Category,
                ReceivableAccountId: results[i].ReceivableAccountId,
                ReceivableAccountManualCode: results[i].ReceivableAccount.ManualCode,
                ReceivableAccountName: results[i].ReceivableAccount.Account,
                TermId: results[i].TermId,
                TermName: results[i].Term.Term,
                CreditLimit: results[i].CreditLimit,
                IsLocked: results[i].IsLocked,
                CreatedByUserFullname: results[i].CreatedByUser.Fullname,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedByUserFullname: results[i].UpdatedByUser.Fullname,
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(customerListObservableArray);
          observer.complete();
        }
      );
    });
  }

  public getArticleCustomerDetail(id: number): Observable<MstArticleCustomerModel> {
    return new Observable<MstArticleCustomerModel>((observer) => {
      let mstArticleCustomerModel: MstArticleCustomerModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleCustomerAPI/detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstArticleCustomerModel = {
              Id: results["Id"],
              ArticleId: results["ArticleId"],
              ArticleCode: results["Article"].ArticleCode,
              ArticleManualCode: results["ArticleManualCode"],
              ArticleParticulars: results["ArticleParticulars"],
              Customer: results["Customer"],
              Address: results["Address"],
              TIN: results["TIN"],
              DiscountId: results["DiscountId"],
              BusinessStyle: results["BusinessStyle"],
              PWDorSCDNo: results["PWDorSCDNo"],
              ContactPerson: results["ContactPerson"],
              ContactNumber: results["ContactNumber"],
              Category: results["Category"],
              ReceivableAccountId: results["ReceivableAccountId"],
              ReceivableAccountManualCode: results["ReceivableAccount"].ManualCode,
              ReceivableAccountName: results["ReceivableAccount"].Account,
              TermId: results["TermId"],
              CreditLimit: results["CreditLimit"],
              IsLocked: results["IsLocked"],
              CreatedByUserFullname: results["CreatedByUser"].Fullname,
              CreatedDateTime: results["CreatedDateTime"],
              UpdatedByUserFullname: results["UpdatedByUser"].Fullname,
              UpdatedDateTime: results["UpdatedDateTime"],
              ZipCode: results["ZipCode"],
            }
          }

          observer.next(mstArticleCustomerModel);
          observer.complete();
        }
      );
    });
  }

  public addArticleCustomer(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/MstArticleCustomerAPI/add", JSON.stringify(""), this.options).subscribe(
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

  public saveArticleCustomer(trnArticleCustomerModel: MstArticleCustomerModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstArticleCustomerAPI/save/" + trnArticleCustomerModel.Id, JSON.stringify(trnArticleCustomerModel), this.options).subscribe(
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

  public lockArticleCustomer(trnArticleCustomerModel: MstArticleCustomerModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstArticleCustomerAPI/lock/" + trnArticleCustomerModel.Id, JSON.stringify(trnArticleCustomerModel), this.options).subscribe(
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

  public unlockArticleCustomer(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstArticleCustomerAPI/unlock/" + id, JSON.stringify(""), this.options).subscribe(
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

  public deleteArticleCustomer(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/MstArticleCustomerAPI/delete/" + id, this.options).subscribe(
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
