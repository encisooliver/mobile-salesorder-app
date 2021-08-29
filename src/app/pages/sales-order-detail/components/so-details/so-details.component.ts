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
  @Output() sOEventEmitter: EventEmitter<any> = new EventEmitter<any>();

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

  clickEmitEvent() {
    let so = this.sOModel;
    this.sOEventEmitter.emit(so);
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
