import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TrnSalesOrderItemModel } from 'src/app/models/trn-sales-order-item.model';
import { MstArticleItemService } from 'src/app/services/mst-article-item/mst-article-item.service';
import { TrnSalesOrderItemService } from 'src/app/services/trn-sales-order-item/trn-sales-order-item.service';
import { SoInventoryItemListComponent } from '../so-inventory-item-list/so-inventory-item-list.component';
import { Storage } from '@ionic/storage';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { SoItemDetailComponent } from '../so-item-detail/so-item-detail.component';
import { TrnSalesOrderModel } from 'src/app/models/trn-sales-order.model';

@Component({
  selector: 'app-so-items',
  templateUrl: './so-items.component.html',
  styleUrls: ['./so-items.component.scss'],
})
export class SoItemsComponent implements OnInit {
  @Input() sOModel: TrnSalesOrderModel = new TrnSalesOrderModel();
  @Output() itemsEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private trnSalesOrderItemService: TrnSalesOrderItemService,
    private storage: Storage,
    private toastService: ToastService,
    private alertCtrl: AlertController
  ) {
  }

  soItems: any[] = [];
  isContentShow: boolean = false;

  getSOList() {
    this.soItems = [];
    this.trnSalesOrderItemService.getSalesOrderItemListBySalesOrder(this.sOModel.Id).subscribe(
      data => {
        if (data.length > 0) {
          this.soItems = data;
          this.clickEmitEvent();
        }
        this.isContentShow = true;
      }
    );
  }

  async soItemDetail(soItem) {
    const modal = await this.modalCtrl.create({
      component: SoItemDetailComponent,
      componentProps: {
        soData: this.sOModel,
        itemData: soItem
      },
    });

    await modal.present();
    await modal.onDidDismiss().then(data => {
      this.getSOList();
    });

  }
  async addSOItem() {
    let modal = await this.modalCtrl.create({
      component: SoInventoryItemListComponent,
      componentProps: {
        sOModel: this.sOModel
      },
      cssClass: "modal-fullscreen"
    });

    await modal.present();
    await modal.onDidDismiss().then(data => {
      this.getSOList();
    });
  }
  async deleteSOItem(sOModel) {
    const confirm = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Do you want to delete this?',
      buttons: [{
        text: 'Confirm',
        role: 'Confirm',
        handler: () => {
          this.trnSalesOrderItemService.deleteSalesOrderItem(sOModel.Id).subscribe(
            data => {
              if (data[0] == true) {
                this.toastService.success('Successfully deleted!');
                this.getSOList();
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
  // event emitter method
  clickEmitEvent() {
    let items = this.soItems;
    let soItems: TrnSalesOrderItemModel[] = [];
    if (items.length > 0) {
      items.forEach(item => {
        let so_item: TrnSalesOrderItemModel = {
          Id: item.Id,
          SOId: item.SOId,
          ItemId: item.ItemId,
          ItemManualCode: item.ItemManualCode,
          ItemSKUCode: item.ItemSKUCode,
          ItemBarCode: item.ItemBarCode,
          ItemDescription: item.ItemDescription,
          ItemInventoryId: item.ItemInventoryId,
          ItemInventoryCode: item.ItemInventoryCode,
          Particulars: item.Particulars,
          Quantity: item.Quantity,
          UnitId: item.UnitId,
          Price: item.Price,
          DiscountId: item.DiscountId,
          DiscountRate: item.DiscountRate,
          DiscountAmount: item.DiscountAmount,
          NetPrice: item.NetPrice,
          Amount: item.Amount,
          VATId: item.VATId,
          VATRate: item.VATRate,
          VATAmount: item.VATAmount,
          WTAXId: item.WTAXId,
          WTAXRate: item.WTAXRate,
          WTAXAmount: item.WTAXAmount,
          LineTimeStamp: item.LineTimeStamp
        }
        console.log(so_item);
        soItems.push(so_item);
      });
      this.itemsEventEmitter.emit(soItems);
    } else {
      this.itemsEventEmitter.emit(soItems);
    }
  }
  ngOnInit() {
    console.log(this.sOModel);
    setTimeout(() => {
      this.getSOList();
    }, 300);
  }
}
