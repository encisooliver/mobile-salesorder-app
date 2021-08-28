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
  @Input() sOModel: TrnSalesOrderModel = new TrnSalesOrderModel();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private trnSalesOrderService: TrnSalesOrderService,
    private toastService: ToastService,
  ) {
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
