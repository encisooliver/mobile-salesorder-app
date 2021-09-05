import { Component, OnInit } from '@angular/core';
import { TrnSalesOrderService } from './../../services/trn-sales-order/trn-sales-order.service';
import { AlertController, ModalController, ModalOptions } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from './../../shared/toast/toast.service';
import { Storage } from '@ionic/storage-angular';
import { TrnSalesOrderModel } from 'src/app/models/trn-sales-order.model';
import { DeleteModalPage } from 'src/app/shared/components/delete-modal/delete-modal.page';
import { SalesOrderService } from 'src/app/services/sales-order/sales-order.service';

@Component({
  selector: 'app-sales-order-list',
  templateUrl: './sales-order-list.page.html',
  styleUrls: ['./sales-order-list.page.scss'],
})
export class SalesOrderListPage implements OnInit {
  token: string = "";

  constructor(
    private router: Router,
    private trnSalesOrderService: TrnSalesOrderService,
    private toastService: ToastService,
    private storage: Storage,
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private salesOrderService: SalesOrderService
  ) {
   
  }

  date = new Date();
  firstDay: string = "";
  lastDay: string = "";

  soList: any[] = [];
  isContentShow: boolean = false;

  getSODateFilter() {
    this.soList = [];
    let dateStart = new Date(this.firstDay).toLocaleDateString("fr-CA");
    let endStart = new Date(this.lastDay).toLocaleDateString("fr-CA");
    this.salesOrderService.getSOListByDate(this.token, dateStart, endStart).subscribe(
      data => {
        let result = data;
        console.log(result);
        if (result.length > 0) {
          this.soList = result;
        }
        setTimeout(() => {
          this.isContentShow = true;
        }, 500);
      }
    );
  }

  addSO(): void {
    let so: TrnSalesOrderModel = {
      Id: 0,
      BranchManualCode: "",
      BranchName: "",
      CurrencyId: 1,
      CurrencyManualCode: "",
      ExchangeRate: 1,
      ExchangeCurrency: "PHP",
      ExchangeCurrencyManualCode: "PHP",
      SONumber: "",

      SODate: new Date(),
      ManualNumber: "",
      DocumentReference: "",
      CustomerId: 292,
      CustomerName: "Customer A",
      TermId: 1,
      DiscountId: 9,
      DiscountRate: 0,
      DateNeeded: new Date(),
      Remarks: "",

      Amount: 0,
      Status: "NEW",

      SoldByUserId: 0,
      SoldByUserFullname: "",
      PreparedByUserId: 0,
      PreparedByUserFullname: "",
      CheckedByUserId: 0,
      CheckedByUserFullname: "",
      ApprovedByUserId: 0,
      ApprovedByUserFullname: "",
      IsCancelled: false,
      IsPrinted: false,
      IsLocked: false,
      CreatedByUserFullname: "",
      CreatedDateTime: "",
      UpdatedByUserFullname: "",
      UpdatedDateTime: "",
      SOItems: []
    }
    this.router.navigate(['/dashboard/sales-order-detail'], {
      queryParams: {
        salesOrderData: JSON.stringify(so),
        action: "Add",
        destination: "Cloud Storage"
      },
      skipLocationChange: true
    });

    // this.trnSalesOrderService.addSalesOrder().subscribe(
    //   data => {

    //     if (data[0] == true) {
    //       this.toastService.success('Sales order was successfully added!');
    //       setTimeout(() => {
    //         this.router.navigate(['dashboard/sales-order-detail/' + data[1]]);
    //       }, 500);
    //     } else {
    //       // this.toastr.error(this.setLabel(data[1]), this.setLabel('Add Failed'));
    //     }

    //   }
    // );
  }

  editSO(sales_order: any) {
    let so: TrnSalesOrderModel = {
      Id: sales_order.Id,
      BranchManualCode: sales_order.BranchManualCode,
      BranchName: sales_order.BranchName,
      CurrencyId: sales_order.CurrencyId,
      CurrencyManualCode: sales_order.CurrencyManualCode,
      ExchangeRate: sales_order.ExchangeRate,
      ExchangeCurrency: sales_order.ExchangeCurrency,
      ExchangeCurrencyManualCode: sales_order.ExchangeCurrencyManualCode,
      SONumber: sales_order.SONumber,

      SODate: sales_order.SODate,
      ManualNumber: sales_order.ManualNumber,
      DocumentReference: sales_order.DocumentReference,
      CustomerId: sales_order.CustomerId,
      CustomerName: sales_order.CustomerName,
      TermId: sales_order.TermId,
      DiscountId: sales_order.DiscountId,
      DiscountRate: sales_order.DiscountRate,
      DateNeeded: sales_order.DateNeeded,
      Remarks: sales_order.Remarks,

      Amount: sales_order.Amount,
      Status: sales_order.Status,

      SoldByUserId: sales_order.SoldByUserId,
      SoldByUserFullname: sales_order.SoldByUserFullname,
      PreparedByUserId: sales_order.PreparedByUser,
      PreparedByUserFullname: sales_order.PreparedByUserFullname,
      CheckedByUserId: sales_order.CheckedByUserId,
      CheckedByUserFullname: sales_order.CheckedByUserFullname,
      ApprovedByUserId: sales_order.ApprovedByUserId,
      ApprovedByUserFullname: sales_order.ApprovedByUserFullname,
      IsCancelled: sales_order.IsCancelled,
      IsPrinted: sales_order.IsPrinted,
      IsLocked: sales_order.IsLocked,
      CreatedByUserFullname: sales_order.CreatedByUserFullname,
      CreatedDateTime: sales_order.CreatedDateTime,
      UpdatedByUserFullname: sales_order.UpdatedByUserFullname,
      UpdatedDateTime: sales_order.UpdatedDateTime,
      SOItems: sales_order.SOItems,
    }

    this.router.navigate(['/dashboard/sales-order-detail'], {
      queryParams: {
        salesOrderData: JSON.stringify(so),
        action: "Edit",
        destination: "Cloud Storage"
      },
      skipLocationChange: true
    });
  }

  async openModal(sOModel) {

    const modal = await this.modalController.create({

      component: DeleteModalPage,
      componentProps: {
        'model_title': sOModel.Id,
        'soNumber': sOModel.SONumber,
        'cName': sOModel.CustomerName
      }
    });

    modal.onDidDismiss().then((id) => {
      if (id !== null) {
        // this.modelData = modelData.data;
        this.getSODateFilter();
      }
    });

    return await modal.present();
  }


  dateChange() {
    this.getSODateFilter();
  }

  async confirmDelete(sOModel) {
    const confirm = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Do you want to delete this?',
      buttons: [{
        text: 'Confirm',
        role: 'Confirm',
        handler: () => {
          this.trnSalesOrderService.deleteSalesOrder(sOModel.Id).subscribe(
            data => {
              if (data[0] == true) {
                this.toastService.success('Sales order was successfully deleted!');
                // this.router.navigate(['dashboard/sales-order-list']);
                this.getSODateFilter();
              } else {
                // this.toastr.error(this.setLabel('');
              }

            }
          );
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await confirm.present();
  }

  ngOnInit() {
    let _startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toLocaleDateString("fr-CA");
    let _endDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).toLocaleDateString("fr-CA");
    this.firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toISOString();
    this.lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).toISOString();
    this.storage.get("access_token").then(
      result => {
        let token = result;
        if (token) {
          this.token = token;
          this.getSODateFilter();
        }
      }
    )
  }
}

