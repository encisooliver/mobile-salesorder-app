import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { TrnSalesOrderModel } from 'src/app/models/trn-sales-order.model';
import { SalesOrderListPage } from 'src/app/pages/sales-order-list/sales-order-list.page';
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
  // sOModel: TrnSalesOrderModel = new TrnSalesOrderModel();
  @Input() public sOModel: TrnSalesOrderModel = new TrnSalesOrderModel();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private trnSalesOrderService: TrnSalesOrderService,
    private toastService: ToastService,

  ) {
    this.storage.get("sales_id").then(
      result => {
        let sales_id = result;
        console.log(sales_id);
        if (sales_id) {
          this.sales_id = sales_id;
          console.log(sales_id);
        }
      }
    )

  }

  id: number = 0;
  so: string = "";
  items: string = "";
  attachment: string = "";
  isShown: boolean = false;
  currencies: any = [];
  terms: any = [];
  status: any = [];
  activeUsers: any = [];
  CustomerUsers: any = [];
  soDate: String = "";
  neededDate: String = "";

  getCustomerUsers() {
    this.trnSalesOrderService.getLockedArticleCustomerList(this.token).subscribe(
      data => {
        this.CustomerUsers = data;
        this.getActiveuser();
      }
    );
  }
  getActiveuser() {
    this.trnSalesOrderService.getActiveUserList().subscribe(
      data => {
        this.activeUsers = data;
        this.getCurrency();
      }
    );
  }
  getCurrency() {
    this.trnSalesOrderService.getCurrencyExchange().subscribe(
      data => {
        this.currencies = data;
        this.getTerms();
      }
    );
  }
  getTerms() {
    this.trnSalesOrderService.getTermList().subscribe(
      data => {
        this.terms = data;
        this.getStatus();
      }
    );
  }

  getStatus() {
    this.trnSalesOrderService.getCodeTableListByCategory("SALES ORDER STATUS").subscribe(
      data => {
        this.status = data;
        this.isShown = true;
        // this.getSO();
      }
    );
  }
  getSO() {
    this.trnSalesOrderService.getSalesOrderDetail(this.sales_id).subscribe(
      data => {
        if (data != null) {
          this.sOModel.Id = data.Id;
          this.sOModel.BranchManualCode = data.BranchManualCode;
          this.sOModel.BranchName = data.BranchName;
          this.sOModel.CurrencyId = data.CurrencyId;
          this.sOModel.ExchangeRate = data.ExchangeRate;
          this.sOModel.ExchangeCurrency = data.ExchangeCurrency;
          this.sOModel.ExchangeCurrencyManualCode = data.ExchangeCurrencyManualCode;
          this.sOModel.SONumber = data.SONumber;
          this.sOModel.SODate = data.SODate;
          this.soDate = new Date(this.sOModel.SODate).toISOString();
          this.sOModel.ManualNumber = data.ManualNumber;
          this.sOModel.DocumentReference = data.DocumentReference;
          this.sOModel.CustomerId = data.CustomerId;
          this.sOModel.CustomerName = data.CustomerName;
          this.sOModel.TermId = data.TermId;
          this.sOModel.DiscountId = data.DiscountId;
          this.sOModel.DiscountRate = data.DiscountRate;
          this.sOModel.DateNeeded = data.DateNeeded;
          this.neededDate = new Date(this.sOModel.DateNeeded).toISOString();
          this.sOModel.Remarks = data.Remarks;
          this.sOModel.SoldByUserId = data.SoldByUserId;
          this.sOModel.SoldByUserFullname = data.SoldByUserFullname;
          this.sOModel.PreparedByUserId = data.PreparedByUserId;
          this.sOModel.PreparedByUserFullname = data.PreparedByUserFullname;
          this.sOModel.CheckedByUserId = data.CheckedByUserId;
          this.sOModel.CheckedByUserFullname = data.CheckedByUserFullname;
          this.sOModel.ApprovedByUserId = data.ApprovedByUserId;
          this.sOModel.ApprovedByUserFullname = data.ApprovedByUserFullname;
          this.sOModel.Amount = data.Amount;
          this.sOModel.Status = data.Status;
          this.sOModel.IsCancelled = data.IsCancelled;
          this.sOModel.IsPrinted = data.IsPrinted;
          this.sOModel.IsLocked = data.IsLocked;
          this.sOModel.CreatedByUserFullname = data.CreatedByUserFullname;
          this.sOModel.CreatedDateTime = data.CreatedDateTime;
          this.sOModel.UpdatedByUserFullname = data.UpdatedByUserFullname;
          this.sOModel.UpdatedDateTime = data.UpdatedDateTime;
          this.isShown = true;
          console.log(this.sOModel);
          this.storage.set("sales_order", JSON.stringify(this.sOModel));
        }
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

  compareFn(e1: any, e2: any): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  compareFn1(e1: TrnSalesOrderModel, e2: TrnSalesOrderModel): boolean {
    return e2.Id == e1.Id;
  }
  compareFn2(e1: any, e2: any): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }
  ngOnInit() {
    this.storage.get("access_token").then(
      result => {
        let token = result;
        if (token) {
          this.token = token;
          this.getCustomerUsers();
        }
      }
    )
  }

}
