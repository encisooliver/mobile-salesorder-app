import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TrnSalesOrderItemModel } from 'src/app/models/trn-sales-order-item.model';
import { MstArticleItemService } from 'src/app/services/mst-article-item/mst-article-item.service';
import { TrnSalesOrderItemService } from 'src/app/services/trn-sales-order-item/trn-sales-order-item.service';
import { SoInventoryItemListComponent } from '../so-inventory-item-list/so-inventory-item-list.component';
import { Storage } from '@ionic/storage';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { SoItemDetailComponent } from '../so-item-detail/so-item-detail.component';

@Component({
  selector: 'app-so-items',
  templateUrl: './so-items.component.html',
  styleUrls: ['./so-items.component.scss'],
})
export class SoItemsComponent implements OnInit {

 

  sales_id: number = 0;

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
    this.trnSalesOrderItemService.getSalesOrderItemListBySalesOrder(this.sales_id).subscribe(
      data => {
        console.log(data);
        if (data.length > 0) {
          this.soItems = data;
          setTimeout(() => {
            console.log(this.soItems.length);
           
          }, 300);
        }
        this.isContentShow = true;
      }
    );
  }

  async soItemDetail(soItem) {
    const modal = await this.modalCtrl.create({
      component: SoItemDetailComponent,
      componentProps: {
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
          console.log('Confirm Ok');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel.');
        }
      }]
    });
    await confirm.present();
  }
  // event emitter
  @Output() itemCounts: EventEmitter<number> = new EventEmitter<number>();
  // event emitter method
  clickEmitEvent(){
    console.log(this.soItems.length);
    this.itemCounts.emit(this.soItems.length);
  }

  ngOnInit() {
    this.storage.get("sales_id").then(
      result => {
        let sales_id = result;
        if (sales_id) {
          this.sales_id = sales_id;
          this.getSOList()
        }
      }
    )
  }
}
