import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrnSalesOrderModel } from 'src/app/models/trn-sales-order.model';
import { TrnSalesOrderService } from 'src/app/services/trn-sales-order/trn-sales-order.service';
import { Storage } from '@ionic/storage-angular';
import { LocalSalesOrderService } from 'src/app/version-two/software-services/local-services/local-sales-order.service';
import { SalesOrder } from 'src/app/version-two/software-models/sales-order.model';
import { SysStorageService } from 'src/app/services/sys-storage/sys-storage.service';

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales-order-detail.page.html',
  styleUrls: ['./sales-order-detail.page.scss'],
})
export class SalesOrderDetailPage implements OnInit {
  sales_id: number = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private trnSalesOrderService: TrnSalesOrderService,
    private sysStorageService: SysStorageService
  ) {
    
  }

  sOModel: TrnSalesOrderModel = new TrnSalesOrderModel();
  soDate: String = "";
  neededDate: String = "";
  isShown: boolean = false;
  getSO() {
    this.trnSalesOrderService.getSalesOrderDetail(this.sales_id).subscribe(
      data => {
        setTimeout(() => {
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

            setTimeout(() => {
              this.isShown = true;
              this.soDetailHidden = false;
              this.soItemHidden = true;
            }, 500);
          }
        }, 500);

      }
    );
  }

  saveSO() {
    let so: SalesOrder = {
      Id: 0,
      SalesOrder: this.sOModel,
      Items: null
    };
    this.sysStorageService.addSO(so).then(data => {
      console.log(data);
    });
  }

  // event method
  itemCount: number = 0;
  soItemCount(data: string) {
    console.log(data);
    // this.itemCount = data;
  }
  soDetailHidden: boolean = false;
  soItemHidden: boolean = true;
  showSODetail() {
    this.soDetailHidden = false;
    this.soItemHidden = true;
  }
  showSOItem() {
    this.soDetailHidden = true;
    this.soItemHidden = false;
  }
  ngOnInit() {
    this.sysStorageService.get("sales_id").then(
      result => {
        let sales_id = result;
        console.log(sales_id);
        if (sales_id) {
          this.sales_id = sales_id;
          this.getSO();
        }
      }
    )
  }
}
