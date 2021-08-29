import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrnSalesOrderModel } from 'src/app/models/trn-sales-order.model';
import { TrnSalesOrderService } from 'src/app/services/trn-sales-order/trn-sales-order.service';
import { Storage } from '@ionic/storage-angular';
import { SysStorageService } from 'src/app/services/sys-storage/sys-storage.service';
import { TrnSalesOrderItemModel } from 'src/app/models/trn-sales-order-item.model';
import { SalesOrder } from 'src/app/models/sales-order.model';

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales-order-detail.page.html',
  styleUrls: ['./sales-order-detail.page.scss'],
})
export class SalesOrderDetailPage implements OnInit {
  sales_id: number = 0;
  token: string = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private trnSalesOrderService: TrnSalesOrderService,
    private sysStorageService: SysStorageService,
    private storage: Storage,
  ) {

  }

  sOModel: TrnSalesOrderModel = new TrnSalesOrderModel();
  sOItemsModel: TrnSalesOrderItemModel[] = [];
  salesOrder: SalesOrder = {
    Id: 0,
    SalesOrder: new TrnSalesOrderModel(),
    Items: []
  };
  soDate: String = "";
  neededDate: String = "";
  isShown: boolean = false;

  soDetailHidden: boolean = false;
  soItemHidden: boolean = true;

  getSO() {
    let id = this.route.snapshot.params['id'];

    this.trnSalesOrderService.getSalesOrderDetail(id, this.token).subscribe(
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
          console.log(this.sOModel);
          setTimeout(() => {
            this.isShown = true;
            this.soDetailHidden = false;
            this.soItemHidden = true;
          }, 500);
        }

      }
    );
  }

  saveSO() {
    this.salesOrder.SalesOrder = this.sOModel;
    this.salesOrder.Items = this.sOItemsModel;
    console.log(this.salesOrder);
    if (this.salesOrder.Id == 0) {
      this.sysStorageService.addSO(this.salesOrder).then(data => {
        this.salesOrder = data;
        console.log(this.salesOrder);
      });
    } else {
      this.sysStorageService.updateSO(this.salesOrder).then(data => {
        this.salesOrder = data;
        console.log(this.salesOrder);
      });
    }
  }

  // event method
  receiveItemEven(items: any) {
    let _items = items;
    this.sOItemsModel = _items;
  }

  showSODetail() {
    this.soDetailHidden = false;
    this.soItemHidden = true;
  }
  showSOItem() {
    this.soDetailHidden = true;
    this.soItemHidden = false;
  }
  back() {
    this.router.navigate(['dashboard/sales-order-list']);
  }
  ngOnInit() {
    this.storage.get("access_token").then(
      result => {
        let token = result;
        if (token) {
          this.token = token;
          this.getSO();
        }
      }
    )
  }
}
