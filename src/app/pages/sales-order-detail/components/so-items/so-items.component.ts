import { Component, OnInit } from '@angular/core';
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
      this.storage.get("sales_id").then(
        result => {
          let sales_id = result;
          console.log(sales_id);
          if (sales_id) {
            this.sales_id = sales_id;
            console.log(sales_id);
            console.log("Karl");
            this.getSOList() 
          }
        }
      )
      
    }
  
    itemList: any[] = [];
    isContentShow: boolean = false;
  
    getSOList() {
      this.trnSalesOrderItemService.getSalesOrderItemListBySalesOrder(this.sales_id).subscribe(
        data => {
          console.log(data);
          console.log("Valorant");
          if (data.length > 0) {
            this.itemList = data;
          }else{
            this.itemList =[];
          }
          setTimeout(() => {
            this.isContentShow = true;
          }, 500);
        }
      );
    }
    
    async openModal(id) {
      
      console.log(id);
      console.log("Pro")
      let trnSalesOrderItemModel: TrnSalesOrderItemModel = new TrnSalesOrderItemModel();
      
      this.trnSalesOrderItemService.getSalesOrderItemDetail(id).subscribe(
        async data => {
          if(data){
            trnSalesOrderItemModel = data;
            console.log(trnSalesOrderItemModel);
            console.log("youtube");
            const modal = await this.modalCtrl.create({
              component: SoItemDetailComponent,
              componentProps: {
                itemData: trnSalesOrderItemModel
      
              },
            });
        
            await modal.present();
            await modal.onDidDismiss().then(data=>{
              console.log(data);
              this.getSOList();
            });
          }
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
    await modal.onDidDismiss().then(data=>{
      console.log(data);
      this.getSOList();
    });
  }
  
  async showConfirm(sOModel) { 
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
                this.toastService.success('Sales order was successfully deleted!');
                console.log(data[1]);
                // this.router.navigate(['dashboard/sales-order-list']);
                this.getSOList();
              } else {
                // this.toastr.error(this.setLabel('');
              }
      
            }
          );
        console.log('Confirm Ok'); 
        }}, 
        { 
        text: 'Cancel', 
        role: 'cancel',
        handler: () => { 
        console.log('Confirm Cancel.');  
        }}] 
      }); 
      await confirm.present(); 
  } 
  ngOnInit() {
    console.log(this.router.url)
    
  }

}
