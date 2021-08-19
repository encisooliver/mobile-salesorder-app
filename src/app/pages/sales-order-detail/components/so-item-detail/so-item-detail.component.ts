import { DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrnSalesOrderItemModel } from 'src/app/models/trn-sales-order-item.model';
import { TrnSalesOrderItemService } from 'src/app/services/trn-sales-order-item/trn-sales-order-item.service';
import { Storage } from '@ionic/storage-angular';
import { TrnSalesOrderModel } from 'src/app/models/trn-sales-order.model';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-so-item-detail',
  templateUrl: './so-item-detail.component.html',
  styleUrls: ['./so-item-detail.component.scss'],
})
export class SoItemDetailComponent implements OnInit {

  @Input() itemData: any;
  sOModel: TrnSalesOrderModel = new TrnSalesOrderModel();
  token;
  companyId;
  constructor(
    private modalController: ModalController,
    private decimalPipe: DecimalPipe,
    private trnSalesOrderItemService: TrnSalesOrderItemService,
    private storage: Storage,
    private toastService: ToastService

  ) {
    this.storage.get("sales_order").then(
      result => {
        let sales_order = result;
        console.log(JSON.parse(sales_order));
        console.log("Wazzap");
        if (sales_order) {
          this.sOModel = sales_order;
        }
      }
    )

    this.storage.get("access_token").then(
      result => {
        let token = result;
        if (token) {
          this.token = token;
        }
      }
    )
    this.storage.get("companyId").then(
      result => {
        let companyId = result;
        if (companyId) {
          this.companyId = companyId;
        }
      }
    )
  }
  trnSalesOrderItemModel: TrnSalesOrderItemModel = new TrnSalesOrderItemModel();
  salesOrderItemQuantity: string = "0.00";
  salesOrderItemPrice: string = "0.00";
  salesOrderItemDiscountRate: string = "0.00";
  salesOrderItemDiscountAmount: string = "0.00";
  salesOrderItemNetPrice: string = "0.00";
  salesOrderItemAmount: string = "0.00";
  salesOrderItemVATRate: string = "0.00";
  salesOrderItemVATAmount: string = "0.00";
  salesOrderItemWTAXRate: string = "0.00";
  salesOrderItemWTAXAmount: string = "0.00";
  defaultVATId: number = null;
  defaultVATRate: number = 0;
  defaultWTAXId: number = null;
  defaultWTAXRate: number = 0;

  listItemUnit: any = [];
  listDiscount: any = [];
  listTax: any = [];
  getArticleItemUnitList(): void {
    this.trnSalesOrderItemService.getArticleItemUnitList(this.itemData.ItemId, this.token).subscribe(
      data => {
        console.log(data);
        this.listItemUnit = data;
        this.getDiscountList();
      }
    );
  }

  getDiscountList(): void {
    this.trnSalesOrderItemService.getDiscountList().subscribe(
      data => {
        console.log(data);
        this.listDiscount = data;
        this.getTaxList();
      }
    );
  }
  getTaxList(): void {
    this.trnSalesOrderItemService.getTaxList().subscribe(
      data => {
        console.log(data);
        this.listTax = data;
        this.getDefaultTax();
      }
    );
  }
  getDefaultTax(): void {
    this.trnSalesOrderItemService.getCompanyDetail(this.companyId).subscribe(
      data => {
        console.log(data);
        setTimeout(() => {
          if (data != null) {
            this.defaultVATId = data.DefaultSIVATId,
              this.defaultVATRate = data.DefaultSIVATRate,
              this.defaultWTAXId = data.DefaultSIWTaxId,
              this.defaultWTAXRate = data.DefaultSIWTaxRate
          }
          this.getSalesOrderItemDetail();
        }, 500);
      }
    )
  }
  getSalesOrderItemDetail(): void {
    console.log(this.itemData);
    this.trnSalesOrderItemService.getSalesOrderItemDetail(this.itemData.Id).subscribe(
      data => {
        setTimeout(() => {
          if (data != null) {
            this.trnSalesOrderItemModel.Id = data.Id;
            this.trnSalesOrderItemModel.SOId = data.SOId;
            this.trnSalesOrderItemModel.ItemId = data.ItemId;
            this.trnSalesOrderItemModel.ItemManualCode = data.ItemManualCode;
            this.trnSalesOrderItemModel.ItemSKUCode = data.ItemSKUCode;
            this.trnSalesOrderItemModel.ItemBarCode = data.ItemBarCode;
            this.trnSalesOrderItemModel.ItemDescription = data.ItemDescription;
            this.trnSalesOrderItemModel.UnitId = data.UnitId;
            this.trnSalesOrderItemModel.ItemInventoryId = data.ItemInventoryId;
            this.trnSalesOrderItemModel.ItemInventoryCode = data.ItemInventoryCode;
            this.trnSalesOrderItemModel.Particulars = data.Particulars;
            this.trnSalesOrderItemModel.Quantity = data.Quantity;
            this.trnSalesOrderItemModel.Price = data.Price;
            this.trnSalesOrderItemModel.DiscountId = data.DiscountId;
            this.trnSalesOrderItemModel.DiscountRate = data.DiscountRate;
            this.trnSalesOrderItemModel.DiscountAmount = data.DiscountAmount;
            this.trnSalesOrderItemModel.NetPrice = data.NetPrice;
            this.trnSalesOrderItemModel.Amount = data.Amount;
            this.trnSalesOrderItemModel.VATId = data.VATId;
            this.trnSalesOrderItemModel.VATRate = data.VATRate;
            this.trnSalesOrderItemModel.VATAmount = data.VATAmount;
            this.trnSalesOrderItemModel.WTAXId = data.WTAXId;
            this.trnSalesOrderItemModel.WTAXRate = data.WTAXRate;
            this.trnSalesOrderItemModel.WTAXAmount = data.WTAXAmount;

            this.salesOrderItemQuantity = this.decimalPipe.transform(data.Quantity, "1.2-2");
            this.salesOrderItemPrice = this.decimalPipe.transform(data.Price, "1.2-2");
            this.salesOrderItemDiscountRate = this.decimalPipe.transform(data.DiscountRate, "1.2-2");
            this.salesOrderItemDiscountAmount = this.decimalPipe.transform(data.DiscountAmount, "1.2-2");
            this.salesOrderItemNetPrice = this.decimalPipe.transform(data.NetPrice, "1.2-2");
            this.salesOrderItemAmount = this.decimalPipe.transform(data.Amount, "1.2-2");
            this.salesOrderItemVATRate = this.decimalPipe.transform(data.VATRate, "1.2-2");
            this.salesOrderItemVATAmount = this.decimalPipe.transform(data.VATAmount, "1.2-2");
            this.salesOrderItemWTAXRate = this.decimalPipe.transform(data.WTAXRate, "1.2-2");
            this.salesOrderItemWTAXAmount = this.decimalPipe.transform(data.WTAXAmount, "1.2-2");
          } else {
            this.trnSalesOrderItemModel.Id = this.itemData.Id;
            this.trnSalesOrderItemModel.SOId = this.itemData.SOId;
            this.trnSalesOrderItemModel.ItemId = this.itemData.ItemId;
            this.trnSalesOrderItemModel.ItemManualCode = this.itemData.ManualCode;
            this.trnSalesOrderItemModel.ItemSKUCode = this.itemData.ItemSKUCode;
            this.trnSalesOrderItemModel.ItemBarCode = this.itemData.ItemBarCode;
            this.trnSalesOrderItemModel.ItemDescription = this.itemData.ItemDescription;
            this.trnSalesOrderItemModel.UnitId = this.itemData.UnitId;
            this.trnSalesOrderItemModel.ItemInventoryId = this.itemData.ItemInventoryId;
            this.trnSalesOrderItemModel.ItemInventoryCode = this.itemData.ItemInventoryCode;
            this.trnSalesOrderItemModel.Particulars = this.itemData.Particulars;

            this.trnSalesOrderItemModel.Quantity = this.itemData.Quantity;
            this.trnSalesOrderItemModel.Price = this.itemData.Price;
            this.trnSalesOrderItemModel.DiscountId = this.itemData.DiscountId;
            this.trnSalesOrderItemModel.DiscountRate = this.itemData.DiscountRate;

            this.trnSalesOrderItemModel.VATId = this.defaultVATId;
            let VATRate: number = this.defaultVATRate;
            this.trnSalesOrderItemModel.VATRate = VATRate;

            this.trnSalesOrderItemModel.WTAXId = this.defaultWTAXId;
            let WTAXRate: number = this.defaultWTAXRate;
            this.trnSalesOrderItemModel.WTAXRate = WTAXRate;

            this.salesOrderItemQuantity = this.decimalPipe.transform(this.itemData.Quantity, "1.2-2");
            this.salesOrderItemPrice = this.decimalPipe.transform(this.itemData.Price, "1.2-2");
            this.salesOrderItemDiscountRate = this.decimalPipe.transform(this.itemData.DiscountRate, "1.2-2");
            this.salesOrderItemDiscountAmount = this.decimalPipe.transform(this.itemData.DiscountAmount, "1.2-2");
            this.salesOrderItemNetPrice = this.decimalPipe.transform(this.itemData.NetPrice, "1.2-2");
            this.salesOrderItemAmount = this.decimalPipe.transform(this.itemData.Amount, "1.2-2");
            this.salesOrderItemVATRate = this.decimalPipe.transform(VATRate, "1.2-2");
            this.salesOrderItemWTAXRate = this.decimalPipe.transform(WTAXRate, "1.2-2");

            // this.onSelectionChangeComputeDiscountAndAmount();
            // this.computeAmount();
            console.log(this.trnSalesOrderItemModel);
          }
        }, 500);

      }
    );
  }

  editedSOList(Id): void {
    console.log("POST MODEL API trnSalesOrderItemModel");
    console.log("Hey");
    // console.log(this.sOModel);
    this.trnSalesOrderItemService.updateSalesOrderItem(this.itemData.Id).subscribe(
      data => {

        if (data[0] == true) {
          this.toastService.success('Sales order was successfully updated!');
          // console.log("SO MOdel   ");
          // console.log(this.sOModel);
          // this.router.navigate(['dashboard/sales-order-list']);
          // this.router.navigate(['dashboard/sales-order-list']);
          setTimeout(() => {
            this.storage.set("sales_id", data[1]);
            // this.router.navigate(['dashboard/sales-order-detail']);
          }, 500);
        } else {
          // this.toastr.error(this.setLabel(data[1]), this.setLabel('Add Failed'));
        }
      }
    );
  }

  buttonSaveSalesOrderItemClick(): void {
    if (this.trnSalesOrderItemModel.Id == 0) {
      this.trnSalesOrderItemService.addSalesOrderItem(this.trnSalesOrderItemModel).subscribe(
        data => {

          if (data[0] == true) {
            // this.toastr.success(this.setLabel('Sales order item was successfully saved!'), this.setLabel('Save Successful'));
            // this.activitySalesOrderItemDetailDialog.close(200);
          } else {
            // this.toastr.error(this.setLabel(data[1]), this.setLabel('Save Failed'));
            // this.isButtonSalesOrderItemDisabled = false;
          }

        }
      );
    } else {
      this.trnSalesOrderItemService.updateSalesOrderItem(this.trnSalesOrderItemModel).subscribe(
        data => {

          if (data[0] == true) {
            // this.toastr.success(this.setLabel('Sales order item was successfully updated!'), this.setLabel('Update Successful'));
            // this.activitySalesOrderItemDetailDialog.close(200);
          } else {
            // this.toastr.error(this.setLabel(data[1]), this.setLabel('Update Failed'));
            // this.isButtonSalesOrderItemDisabled = false;
          }

        }
      );
    }
  }



  ngOnInit() {
    console.log(this.itemData);
    setTimeout(() => {
      this.getArticleItemUnitList();
    }, 500);
  }
  dismiss() {
    this.modalController.dismiss();
  }
}
