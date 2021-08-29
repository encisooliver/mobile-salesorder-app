import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrnSalesOrderModel } from 'src/app/models/trn-sales-order.model';
import { TrnSalesOrderService } from 'src/app/services/trn-sales-order/trn-sales-order.service';
import { Storage } from '@ionic/storage-angular';
import { SysStorageService } from 'src/app/services/sys-storage/sys-storage.service';
import { TrnSalesOrderItemModel } from 'src/app/models/trn-sales-order-item.model';
import { SalesOrder } from 'src/app/models/sales-order.model';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales-order-detail.page.html',
  styleUrls: ['./sales-order-detail.page.scss'],
})
export class SalesOrderDetailPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private trnSalesOrderService: TrnSalesOrderService,
    private sysStorageService: SysStorageService,
    private storage: Storage,
    private toastService: ToastService,
  ) {

  }
  action: string = "";
  token: string = "";

  salesOrder: TrnSalesOrderModel = new TrnSalesOrderModel();
  sOItems: TrnSalesOrderItemModel[] = [];
  salesOrderLocalModel: SalesOrder = {
    Id: 0,
    SalesOrder: new TrnSalesOrderModel(),
  };

  soDate: String = "";
  neededDate: String = "";
  isShown: boolean = false;
  salesOrderHidden: boolean = false;
  soItemHidden: boolean = true;

  getSO() {
    let id = this.route.snapshot.params['id'];
    console.log(id);
    this.trnSalesOrderService.getSalesOrderDetail(id, this.token).subscribe(
      data => {
        if (data != null) {
          this.salesOrder.Id = data.Id;
          this.salesOrder.BranchManualCode = data.BranchManualCode;
          this.salesOrder.BranchName = data.BranchName;
          this.salesOrder.CurrencyId = data.CurrencyId;
          this.salesOrder.ExchangeRate = data.ExchangeRate;
          this.salesOrder.ExchangeCurrency = data.ExchangeCurrency;
          this.salesOrder.ExchangeCurrencyManualCode = data.ExchangeCurrencyManualCode;
          this.salesOrder.SONumber = data.SONumber;
          this.salesOrder.SODate = data.SODate;
          this.soDate = new Date(this.salesOrder.SODate).toISOString();
          this.salesOrder.ManualNumber = data.ManualNumber;
          this.salesOrder.DocumentReference = data.DocumentReference;
          this.salesOrder.CustomerId = data.CustomerId;
          this.salesOrder.CustomerName = data.CustomerName;
          this.salesOrder.TermId = data.TermId;
          this.salesOrder.DiscountId = data.DiscountId;
          this.salesOrder.DiscountRate = data.DiscountRate;
          this.salesOrder.DateNeeded = data.DateNeeded;
          this.neededDate = new Date(this.salesOrder.DateNeeded).toISOString();
          this.salesOrder.Remarks = data.Remarks;
          this.salesOrder.SoldByUserId = data.SoldByUserId;
          this.salesOrder.SoldByUserFullname = data.SoldByUserFullname;
          this.salesOrder.PreparedByUserId = data.PreparedByUserId;
          this.salesOrder.PreparedByUserFullname = data.PreparedByUserFullname;
          this.salesOrder.CheckedByUserId = data.CheckedByUserId;
          this.salesOrder.CheckedByUserFullname = data.CheckedByUserFullname;
          this.salesOrder.ApprovedByUserId = data.ApprovedByUserId;
          this.salesOrder.ApprovedByUserFullname = data.ApprovedByUserFullname;
          this.salesOrder.Amount = data.Amount;
          this.salesOrder.Status = data.Status;
          this.salesOrder.IsCancelled = data.IsCancelled;
          this.salesOrder.IsPrinted = data.IsPrinted;
          this.salesOrder.IsLocked = data.IsLocked;
          this.salesOrder.CreatedByUserFullname = data.CreatedByUserFullname;
          this.salesOrder.CreatedDateTime = data.CreatedDateTime;
          this.salesOrder.UpdatedByUserFullname = data.UpdatedByUserFullname;
          this.salesOrder.UpdatedDateTime = data.UpdatedDateTime;
          console.log(this.salesOrder);
          setTimeout(() => {
            this.isShown = true;
            this.salesOrderHidden = false;
            this.soItemHidden = true;
          }, 500);
        }

      }
    );
  }

  saveSO(): void {
    this.salesOrder.SOItems = this.sOItems;
    this.salesOrderLocalModel.SalesOrder = this.salesOrder;

    this.trnSalesOrderService.saveSalesOrder(this.salesOrder).subscribe(
      data => {
        if (data[0] == true) {
          this.toastService.success('Sales order was successfully updated!');
        } else {
          // this.toastr.error(data[1], this.setLabel('Add Failed'));
        }
      }
    );
  }

  saveSOToLocal() {

    if (this.salesOrder.Id == 0) {
      this.sysStorageService.addSO(this.salesOrderLocalModel).then(data => {
        this.salesOrderLocalModel = data;
      });
    } else {
      this.sysStorageService.updateSO(this.salesOrderLocalModel).then(data => {
        this.salesOrderLocalModel = data;
      });
    }
  }

  // event method
  receiveItemEvent(items: any) {
    let _items = items;
    this.sOItems = _items;
    console.log(this.sOItems);
  }
  receiveSODetailEvent(so_detail: any) {
    let _salesOrder = so_detail;
    this.salesOrder = _salesOrder;
    console.log(this.salesOrder);
  }

  showsalesOrder() {
    setTimeout(() => {
      this.salesOrderHidden = false;
      this.soItemHidden = true;
    }, 300);
  }
  showSOItem() {
    console.log("fire!");
    setTimeout(() => {
      this.salesOrderHidden = true;
      this.soItemHidden = false;
    }, 300);
  }
  back() {
    this.router.navigate(['dashboard/sales-order-list']);
  }
  sub: any;
  ngOnInit() {

    this.storage.get("access_token").then(
      result => {
        let token = result;
        if (token) {
          this.token = token;
        }
      }
    )

    this.sub = this.route.queryParams.subscribe(params => {
      if (params != null) {
        let action = params['action'];
        if (action != null) {
          this.action = action;
          console.log(this.action);
        }

        let so = JSON.parse(params['salesOrderData']);
        if (so != null) {
          this.salesOrder = so;
          this.salesOrder.Id = so.Id;
          this.salesOrder.BranchManualCode = so.BranchManualCode;
          this.salesOrder.BranchName = so.BranchName;
          this.salesOrder.CurrencyId = so.CurrencyId;
          this.salesOrder.ExchangeRate = so.ExchangeRate;
          this.salesOrder.ExchangeCurrency = so.ExchangeCurrency;
          this.salesOrder.ExchangeCurrencyManualCode = so.ExchangeCurrencyManualCode;
          this.salesOrder.SONumber = so.SONumber;
          this.salesOrder.SODate = so.SODate;
          this.soDate = new Date(this.salesOrder.SODate).toISOString();
          this.salesOrder.ManualNumber = so.ManualNumber;
          this.salesOrder.DocumentReference = so.DocumentReference;
          this.salesOrder.CustomerId = so.CustomerId;
          this.salesOrder.CustomerName = so.CustomerName;
          this.salesOrder.TermId = so.TermId;
          this.salesOrder.DiscountId = so.DiscountId;
          this.salesOrder.DiscountRate = so.DiscountRate;
          this.salesOrder.DateNeeded = so.DateNeeded;
          this.neededDate = new Date(this.salesOrder.DateNeeded).toISOString();
          this.salesOrder.Remarks = so.Remarks;
          this.salesOrder.SoldByUserId = so.SoldByUserId;
          this.salesOrder.SoldByUserFullname = so.SoldByUserFullname;
          this.salesOrder.PreparedByUserId = so.PreparedByUserId;
          this.salesOrder.PreparedByUserFullname = so.PreparedByUserFullname;
          this.salesOrder.CheckedByUserId = so.CheckedByUserId;
          this.salesOrder.CheckedByUserFullname = so.CheckedByUserFullname;
          this.salesOrder.ApprovedByUserId = so.ApprovedByUserId;
          this.salesOrder.ApprovedByUserFullname = so.ApprovedByUserFullname;
          this.salesOrder.Amount = so.Amount;
          this.salesOrder.Status = so.Status;
          this.salesOrder.IsCancelled = so.IsCancelled;
          this.salesOrder.IsPrinted = so.IsPrinted;
          this.salesOrder.IsLocked = so.IsLocked;
          this.salesOrder.CreatedByUserFullname = so.CreatedByUserFullname;
          this.salesOrder.CreatedDateTime = so.CreatedDateTime;
          this.salesOrder.UpdatedByUserFullname = so.UpdatedByUserFullname;
          this.salesOrder.UpdatedDateTime = so.UpdatedDateTime;
          this.salesOrder.SOItems = so.SOItems;
          console.log(this.salesOrder);
          setTimeout(() => {
            this.isShown = true;
            this.salesOrderHidden = false;
            this.soItemHidden = true;
          }, 500);
        }


      }
    });
  }
  ngDestroy(): void {
    this.sub.unsubscribe();
  }
}
