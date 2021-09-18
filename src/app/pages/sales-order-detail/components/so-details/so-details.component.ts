import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { TrnSalesOrderModel } from 'src/app/models/trn-sales-order.model';
import { TrnSalesOrderService } from 'src/app/services/trn-sales-order/trn-sales-order.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-so-details',
  templateUrl: './so-details.component.html',
  styleUrls: ['./so-details.component.scss'],
})

export class SoDetailsComponent implements OnInit {
  sales_id: number = 0;
  token: string = "";
  @Input() sOModel: TrnSalesOrderModel = new TrnSalesOrderModel();
  @Input() soAmount: string = "0.00";
  @Output() sOEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private trnSalesOrderService: TrnSalesOrderService,
    private toastService: ToastService,
    private datepipe: DatePipe,
    private decimalPipe: DecimalPipe
  ) {
  }
  setup: any;


  id: number = 0;
  so: string = "";
  attachment: string = "";
  isShown: boolean = false;

  currencies: any = [];
  terms: any = [];
  discounts: any = [];
  status: any = [];
  activeUsers: any = [];
  customerUsers: any = [];

  soDate: String = "";
  neededDate: String = "";
  salesOrderAmount: string = "0.00";
  getSetup(): void {
    this.storage.get("setup").then(
      result => {
        let data = result;
        if (data) {
          this.customerUsers = data.Customer;
          this.currencies = data.Currency;
          this.terms = data.Term;
          this.discounts = data.Discount;
          this.status = data.CodeTable;
          this.isShown = true;
        }
        this.isShown = true;
        this.clickEmitEvent();
        // this.getCustomerUsers();
      }
    )

  }
  getCustomerUsers() {
    this.trnSalesOrderService.getLockedArticleCustomerList(this.token).subscribe(
      data => {
        console.log(data);
        // this.customerUsers = data;
        this.getActiveuser();
      }
    );
  }
  getActiveuser() {
    this.trnSalesOrderService.getActiveUserList().subscribe(
      data => {
        // this.activeUsers = data;
        this.getCurrency();
      }
    );
  }
  getCurrency() {
    this.trnSalesOrderService.getCurrencyExchange().subscribe(
      data => {
        // this.currencies = data;
        this.getTerms();
      }
    );
  }
  getTerms() {
    this.trnSalesOrderService.getTermList().subscribe(
      data => {
        // this.terms = data;
        this.getStatus();
      }
    );
  }

  getStatus() {
    this.trnSalesOrderService.getCodeTableListByCategory("SALES ORDER STATUS").subscribe(
      data => {
        // this.status = data;
        this.isShown = true;
        this.clickEmitEvent();
      }
    );
  }

  editedSO(): void {
    this.trnSalesOrderService.saveSalesOrder(this.sOModel).subscribe(
      data => {
        if (data[0] == true) {
          this.toastService.success('Sales order was successfully updated!');
        } else {
          // this.toastr.error(data[1], this.setLabel('Add Failed'));
        }
      }
    );
  }
  discountChange(){
    let _selectedDiscount: any = this.customerUsers.filter(data => data.ArticleId === this.sOModel.CustomerId);
    let _discount: number = _selectedDiscount[0].DiscountRate;
    this.sOModel.DiscountRate = _discount;
  }
  customerChange() {
    let _selectedCustomer: any = this.discounts.filter(data => data.Id === this.sOModel.DiscountId);
    let _customerName: string = _selectedCustomer[0].Customer;
    this.sOModel.CustomerName = _customerName;
    console.log(_customerName);

    this.soDetailChange();
  }
  currencyChange() {
    let _selectedCurrency: any = this.currencies.filter(data => data.ExchangeCurrencyId === this.sOModel.CurrencyId);
    let _currencyCode: string = _selectedCurrency[0].ExchangeCurrencyManualCode;
    this.sOModel.ExchangeCurrency = _currencyCode;
    this.sOModel.CurrencyManualCode = _currencyCode;
    this.soDetailChange();
  }

  soDetailChange() {
    this.clickEmitEvent();
  }
  clickEmitEvent() {
    this.sOModel.SODate = this.convertDate(this.soDate);
    this.sOModel.DateNeeded = this.convertDate(this.neededDate);
    this.salesOrderAmount = this.decimalPipe.transform(this.sOModel.Amount, "1.2-2");

    let so = this.sOModel;
    this.sOEventEmitter.emit(so);
  }

  convertDate(date: any) {
    let _date = new Date(date);
    let year = _date.getFullYear();
    let month = _date.getMonth() + 1;
    let dt = _date.getDate();

    return new Date(year + '/' + month + '/' + dt);
  }

  ngOnInit() {
    this.soDate = new Date(this.sOModel.SODate).toISOString();
    this.neededDate = new Date(this.sOModel.DateNeeded).toISOString();
    this.storage.get("access_token").then(
      result => {
        let token = result;
        if (token) {
          this.token = token;
          this.getSetup();
        }
      }
    )
  }
}
