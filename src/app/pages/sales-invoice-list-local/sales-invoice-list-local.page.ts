import { Component, OnInit } from '@angular/core';
import { TrnSalesOrderService } from './../../services/trn-sales-order/trn-sales-order.service';
import { AlertController, ModalController, ModalOptions } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from './../../shared/toast/toast.service';
import { Storage } from '@ionic/storage-angular';
import { TrnSalesOrderModel } from 'src/app/models/trn-sales-order.model';
import { SysStorageService } from 'src/app/services/sys-storage/sys-storage.service';
import { DatePipe } from '@angular/common';
import { SalesOrder } from 'src/app/models/sales-order.model';
import { DeleteModalPage } from 'src/app/shared/components/delete-modal/delete-modal.page';
import { SalesOrderService } from 'src/app/services/sales-order/sales-order.service';

@Component({
  selector: 'app-sales-invoice-list-local',
  templateUrl: './sales-invoice-list-local.page.html',
  styleUrls: ['./sales-invoice-list-local.page.scss'],
})
export class SalesInvoiceListLocalPage implements OnInit {

  token: string = "";

  constructor(
    private router: Router,
    private trnSalesOrderService: TrnSalesOrderService,
    private toastService: ToastService,
    private storage: Storage,
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private sysStorageService: SysStorageService,
    private datepipe: DatePipe,
    private salesOrderService: SalesOrderService
  ) {

    this.storage.get("access_token").then(
      result => {
        let token = result;
        if (token) {
          this.token = token;
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
  }

  ionViewWillEnter() {
    let _startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toLocaleDateString("fr-CA");
    let _endDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).toLocaleDateString("fr-CA");
    this.firstDay = new Date(_startDate).toISOString();
    this.lastDay = new Date(_endDay).toISOString();
    this.getSO();
  }

  date = new Date();
  firstDay: string = "";
  lastDay: string = "";

  soList: any[] = [];
  isContentShow: boolean = false;

  getSO() {
    this.sysStorageService.getSOs().then(
      data => {
        console.log(data);
        if (data.length > 0) {
          this.soList = data;
        } else {
          this.soList = [];
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
    let sales_order: SalesOrder = {
      Id: 0,
      SalesOrder: so
    }
    this.router.navigate(['/dashboard/sales-order-detail'], {
      queryParams: {
        salesOrderData: JSON.stringify(sales_order),
        action: "Add",
        destination: "Local Storage"
      },
      // skipLocationChange: true
    });
  }

  editSO(sales_order: any) {
    this.router.navigate(['/dashboard/sales-order-detail'], {
      queryParams: {
        salesOrderData: JSON.stringify(sales_order),
        action: "Edit",
        destination: "Local Storage"
      },
      // skipLocationChange: true
    });
  }

  counter: number = 0;
  dataCount: number = 0;

  async importAllSO() {
    this.dataCount = this.soList.length;
    this.counter = 0;
    this.uploadSO(this.soList[this.counter]);
  }

  async uploadSO(_os: SalesOrder) {
    if (_os.SalesOrder.Id == 0) {
      console.log(_os);
      await this.salesOrderService.addSalesOrder(_os.SalesOrder).subscribe(
        async data => {
          if (data[0] == true) {
             this.sysStorageService.deleteSO(_os.Id).then(
              data => {
                this.counter++;
                if (this.counter < this.soList.length) {
                  this.uploadSO(this.soList[this.counter]);
                } else {
                  this.getSO();
                  this.toastService.success('Successfully uploaded');
                }
              }
            );
          } else {
            this.toastService.success('Connection Lost');
          }
        }
      );
    }
    else {
      await this.salesOrderService.saveSalesOrder(_os.SalesOrder).subscribe(
        async data => {
          if (data[0] == true) {
            await this.sysStorageService.deleteSO(_os.Id).then(
              data => {
                this.counter++;
                if (this.counter < this.soList.length) {
                  this.uploadSO(this.soList[this.counter]);
                } else {
                  this.getSO();
                  this.toastService.success('Successfully uploaded');
                }
              }
            );
          } else {
            this.toastService.success('Connection Lost');
          }
        }
      );
    }
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
        this.getSO();
      }
    });

    return await modal.present();
  }


  dateChange() {
    this.getSO();
  }

  async confirmDelete(sOModel) {
    const confirm = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Do you want to delete this?',
      buttons: [{
        text: 'Confirm',
        role: 'Confirm',
        handler: () => {

          this.sysStorageService.deleteSO(sOModel.Id).then(
            data => {
              console.log(data);
              if (data.length > 0) {
                this.soList = data;
              } else {
                this.soList = [];
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
  formatDate(date) {
    return this.datepipe.transform(date, "mm/dd/yyyy")
  }
  ngOnInit() {

  }

}
