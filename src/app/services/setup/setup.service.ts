import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../settings/app-settings';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

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

  public getSetup(token: string): Observable<any[]> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return new Observable<any[]>((observer) => {

      this.httpClient.get(this.defaultAPIURLHost + "/api/EasyfisMobileAPI/easyfismobile/", options).subscribe(
        response => {
          let results = response;
          this.storage.set('setup', results);
          observer.next([true, "success"]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error]);
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
                ExchangeRate: results[i].ExchangeRate,
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

  public getLockedArticleCustomerList(token): Observable<any[]> {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return new Observable<any[]>((observer) => {
      let customerList = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleCustomerAPI/list/locked", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
             customerList.push({
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

          observer.next(customerList);
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
