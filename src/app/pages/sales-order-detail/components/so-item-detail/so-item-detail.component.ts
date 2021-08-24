import { DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrnSalesOrderItemModel } from 'src/app/models/trn-sales-order-item.model';
import { TrnSalesOrderItemService } from 'src/app/services/trn-sales-order-item/trn-sales-order-item.service';
import { Storage } from '@ionic/storage-angular';
import { TrnSalesOrderModel } from 'src/app/models/trn-sales-order.model';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Router } from '@angular/router';

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
  trnSalesOrderItemModel: TrnSalesOrderItemModel = new TrnSalesOrderItemModel();
  constructor(
    private modalController: ModalController,
    private decimalPipe: DecimalPipe,
    private trnSalesOrderItemService: TrnSalesOrderItemService,
    private storage: Storage,
    private toastService: ToastService,
    private router: Router

  ) {
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
  listItemPrice: any = [];

  getSODetail() {
    this.storage.get("sales_order").then(
      result => {
        let sales_order = result;
        console.log("Hey");
        if (sales_order) {
          this.sOModel = JSON.parse(sales_order);
          console.log(sales_order);
        }
        this.getArticleItemUnitList();
      }
    )
  }

  getArticleItemUnitList(): void {
    this.trnSalesOrderItemService.getArticleItemUnitList(this.itemData.ItemId, this.token).subscribe(
      data => {
        console.log(data);
        this.listItemUnit = data;
        this.getArticleItemPriceList();
      }
    );
  }
  getArticleItemPriceList(): void {
    this.trnSalesOrderItemService.getArticleItemPriceList(this.itemData.ItemId, this.token).subscribe(
      data => {
        console.log(data);
        this.listItemPrice = data;
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
            this.onSelectionChangeComputeDiscountAndAmount();
            this.computeAmount();
            console.log(this.trnSalesOrderItemModel);
          }
        }, 500);

      }
    );
  }


  buttonSaveSalesOrderItemClick(): void {
    if (this.trnSalesOrderItemModel.Id == 0) {
      this.trnSalesOrderItemService.addSalesOrderItem(this.trnSalesOrderItemModel).subscribe(
        data => {

          if (data[0] == true) {
            // this.toastService.success(this.setLabel('Sales order item was successfully saved!'), this.setLabel('Save Successful'));
            this.toastService.success('Sales order was successfully added!');
            console.log(data);
            this.modalController.dismiss();

          } else {
            // this.toastr.error(this.setLabel(data[1]), this.setLabel('Save Failed'));
            // this.isButtonSalesOrderItemDisabled = false;
          }

        }
      );
    } else {
      console.log(this.trnSalesOrderItemModel);
      this.trnSalesOrderItemService.updateSalesOrderItem(this.trnSalesOrderItemModel).subscribe(
        data => {
          console.log(data);
          console.log("Pro Karl");
          if (data[0] == true) {
            // this.toastr.success(this.setLabel('Sales order item was successfully updated!'), this.setLabel('Update Successful'));
            // this.activitySalesOrderItemDetailDialog.close(200);
            this.toastService.success('Sales order was successfully updated!');
            this.modalController.dismiss();
          } else {
            // this.toastr.error(this.setLabel(data[1]), this.setLabel('Update Failed'));
            // this.isButtonSalesOrderItemDisabled = false;
          }

        }
      );
    }
  }

  public onKeyPressNumberOnly(event: any): boolean {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      if (charCode === 46 && event.target.value.split('.').length === 2) {
        return false;
      } else {
        return true;
      }
    }
  }

  public onFocusNumberRemoveCommas(field: string) {
    if (field === "salesOrderItemQuantity") {
      this.salesOrderItemQuantity = this.salesOrderItemQuantity.split(',').join("");
    }
    if (field === "salesOrderItemPrice") {
      this.salesOrderItemPrice = this.salesOrderItemPrice.split(',').join("");
    }
    if (field === "salesOrderItemDiscountRate") {
      this.salesOrderItemDiscountRate = this.salesOrderItemDiscountRate.split(',').join("");
    }
    if (field === "salesOrderItemDiscountAmount") {
      this.salesOrderItemDiscountAmount = this.salesOrderItemDiscountAmount.split(',').join("");
    }
    if (field === "salesOrderItemNetPrice") {
      this.salesOrderItemNetPrice = this.salesOrderItemNetPrice.split(',').join("");
    }
    if (field === "salesOrderItemAmount") {
      this.salesOrderItemAmount = this.salesOrderItemAmount.split(',').join("");
    }
    if (field === "salesOrderItemVATRate") {
      this.salesOrderItemVATRate = this.salesOrderItemVATRate.split(',').join("");
    }
    if (field === "salesOrderItemVATAmount") {
      this.salesOrderItemVATAmount = this.salesOrderItemVATAmount.split(',').join("");
    }
    if (field === "salesOrderItemWTAXRate") {
      this.salesOrderItemWTAXRate = this.salesOrderItemWTAXRate.split(',').join("");
    }
    if (field === "salesOrderItemWTAXAmount") {
      this.salesOrderItemWTAXAmount = this.salesOrderItemWTAXAmount.split(',').join("");
    }
  }

  public onaBlurNumberAddCommas(numberValue: string, field: string) {
    if (field === "salesOrderItemQuantity") {
      this.salesOrderItemQuantity = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSalesOrderItemModel.Quantity = parseFloat(this.salesOrderItemQuantity.split(',').join(""));
    }
    if (field === "salesOrderItemPrice") {
      this.salesOrderItemPrice = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSalesOrderItemModel.Price = parseFloat(this.salesOrderItemPrice.split(',').join(""));
    }
    if (field === "salesOrderItemDiscountRate") {
      this.salesOrderItemDiscountRate = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSalesOrderItemModel.DiscountRate = parseFloat(this.salesOrderItemDiscountRate.split(',').join(""));
    }
    if (field === "salesOrderItemDiscountAmount") {
      this.salesOrderItemDiscountAmount = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSalesOrderItemModel.DiscountAmount = parseFloat(this.salesOrderItemDiscountAmount.split(',').join(""));
    }
    if (field === "salesOrderItemNetPrice") {
      this.salesOrderItemNetPrice = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSalesOrderItemModel.NetPrice = parseFloat(this.salesOrderItemNetPrice.split(',').join(""));
    }
    if (field === "salesOrderItemAmount") {
      this.salesOrderItemAmount = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSalesOrderItemModel.Amount = parseFloat(this.salesOrderItemAmount.split(',').join(""));
    }
    if (field === "salesOrderItemVATRate") {
      this.salesOrderItemVATRate = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSalesOrderItemModel.VATRate = parseFloat(this.salesOrderItemVATRate.split(',').join(""));
    }
    if (field === "salesOrderItemVATAmount") {
      this.salesOrderItemVATAmount = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSalesOrderItemModel.VATRate = parseFloat(this.salesOrderItemVATAmount.split(',').join(""));
    }
    if (field === "salesOrderItemWTAXRate") {
      this.salesOrderItemWTAXRate = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSalesOrderItemModel.WTAXRate = parseFloat(this.salesOrderItemWTAXRate.split(',').join(""));
    }
    if (field === "salesOrderItemWTAXAmount") {
      this.salesOrderItemWTAXAmount = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSalesOrderItemModel.WTAXAmount = parseFloat(this.salesOrderItemWTAXAmount.split(',').join(""));
    }
  }

  public onSelectionChangeComputeDiscountAndAmount(): void {
    let selectedDiscount: any = this.listDiscount.filter(wtax => wtax.Id === this.trnSalesOrderItemModel.DiscountId);
    let DiscountRate: number = selectedDiscount[0].DiscountRate;

    this.trnSalesOrderItemModel.DiscountRate = DiscountRate;
    this.salesOrderItemDiscountRate = this.decimalPipe.transform(DiscountRate, "1.2-2");
    console.log(selectedDiscount);
    this.computeAmount();
  }

  public onKeyUpComputeAmountFromQuantity(event: any) {
    let quantity = event.target.value;
    this.trnSalesOrderItemModel.Quantity = quantity;
    console.log();
    this.computeAmount();
  }

  public onKeyUpComputeAmountFromDiscountRate(event: any) {
    let discountRate = event.target.value;
    this.trnSalesOrderItemModel.DiscountRate = discountRate;

    this.computeAmount();
  }

  onSelectionChangeComputePrice(event: any) {
    let price = event.target.value;
    this.trnSalesOrderItemModel.Price = parseFloat(price);
    this.computeAmount();
  }
  public computeAmount() {
    let quantity = this.trnSalesOrderItemModel.Quantity;
    let price = this.trnSalesOrderItemModel.Price;
    let discountRate = this.trnSalesOrderItemModel.DiscountRate;

    let discountAmount = price * (discountRate / 100);
    this.trnSalesOrderItemModel.DiscountAmount = discountAmount;
    this.salesOrderItemDiscountAmount = this.decimalPipe.transform(discountAmount, "1.2-2");

    let netPrice = price - discountAmount;
    this.trnSalesOrderItemModel.NetPrice = netPrice;
    this.salesOrderItemNetPrice = this.decimalPipe.transform(netPrice, "1.2-2");

    let amount = netPrice * quantity;
    this.trnSalesOrderItemModel.Amount = amount;
    this.salesOrderItemAmount = this.decimalPipe.transform(amount, "1.2-2");

    this.computeVATAmount();
    this.computeWTAXAmount();
  }

  public onKeyUpComputeAmountFromDiscountAmount(event: any) {
    let discountAmount: number = event.target.value;
    this.trnSalesOrderItemModel.DiscountAmount = discountAmount;

    this.computeDiscountRateAndAmount();
  }

  public computeDiscountRateAndAmount() {
    let discountAmount = this.trnSalesOrderItemModel.DiscountAmount;
    let price = this.trnSalesOrderItemModel.Price;

    let discountRate = (discountAmount / price) * 100;
    this.trnSalesOrderItemModel.DiscountRate = discountRate;
    this.salesOrderItemDiscountRate = this.decimalPipe.transform(discountRate, "1.2-2");

    let quantity = this.trnSalesOrderItemModel.Quantity;

    let netPrice = price - discountAmount;
    this.trnSalesOrderItemModel.NetPrice = netPrice;
    this.salesOrderItemNetPrice = this.decimalPipe.transform(netPrice, "1.2-2");

    let amount = netPrice * quantity;
    this.trnSalesOrderItemModel.Amount = amount;
    this.salesOrderItemAmount = this.decimalPipe.transform(amount, "1.2-2");

    this.computeVATAmount();
    this.computeWTAXAmount();
  }

  public onSelectionChangeComputeVATAmount(): void {
    let selectedVAT: any = this.listTax.filter(vat => vat.Id === this.trnSalesOrderItemModel.VATId);
    let VATRate: number = selectedVAT[0].TaxRate;

    this.trnSalesOrderItemModel.VATRate = VATRate;
    this.salesOrderItemVATRate = this.decimalPipe.transform(VATRate, "1.2-2");

    this.computeVATAmount();
  }

  public computeVATAmount() {
    // let exchangeRate: number = this.dialogData.ExchangeRate;
    let exchangeRate: number = 1;
    let amount = this.trnSalesOrderItemModel.Amount;

    if (exchangeRate > 0) {
      amount = this.trnSalesOrderItemModel.Amount * exchangeRate;
    }

    let VATRate = this.trnSalesOrderItemModel.VATRate;

    let VATAmount = 0;
    //  amount / (1 + (VATRate / 100)) * (VATRate / 100)
    if (VATRate > 0) {
      VATAmount = amount / (1 + (VATRate / 100)) * (VATRate / 100);
    }

    this.trnSalesOrderItemModel.VATAmount = VATAmount;
    this.salesOrderItemVATAmount = this.decimalPipe.transform(VATAmount, "1.2-2");
  }

  public onSelectionChangeComputeWTAXAmount(): void {
    let selectedWTAX: any = this.listTax.filter(wtax => wtax.Id === this.trnSalesOrderItemModel.WTAXId);
    let WTAXRate: number = selectedWTAX[0].TaxRate;

    this.trnSalesOrderItemModel.WTAXRate = WTAXRate;
    this.salesOrderItemWTAXRate = this.decimalPipe.transform(WTAXRate, "1.2-2");

    this.computeWTAXAmount();
  }

  public computeWTAXAmount() {
    // let exchangeRate: number = this.dialogData.ExchangeRate;
    let exchangeRate: number = 1;
    let amount = this.trnSalesOrderItemModel.Amount;

    if (exchangeRate > 0) {
      amount = this.trnSalesOrderItemModel.Amount * exchangeRate;
    }

    let VATAmount = this.trnSalesOrderItemModel.VATAmount;
    let WTAXRate = this.trnSalesOrderItemModel.WTAXRate;

    let WTAXAmount = 0;
    // amount / (1 + (WTAXRate / 100)) * (WTAXRate / 100)
    if (WTAXRate) {
      WTAXAmount = (amount - VATAmount) * (WTAXRate / 100)
    }
    this.trnSalesOrderItemModel.WTAXAmount = WTAXAmount;
    this.salesOrderItemWTAXAmount = this.decimalPipe.transform(WTAXAmount, "1.2-2");
  }



  ngOnInit() {
    this.storage.get("sales_order").then(
      result => {
        let sales_order = result;
        if (sales_order) {
          this.sOModel = JSON.parse(sales_order);
          this.getArticleItemUnitList();
        }
      }
    )

    // setTimeout(() => {
    //   this.getArticleItemUnitList();
    // }, 500);
    // if(this.itemData){
    //   this.trnSalesOrderItemModel = this.itemData;
    //   console.log("CF");
    //   console.log(this.itemData);
    // }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
