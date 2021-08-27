import { Component, OnInit } from '@angular/core';
import { TrnSalesOrderService } from './../../services/trn-sales-order/trn-sales-order.service';
import { AlertController, ModalController, ModalOptions } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from './../../shared/toast/toast.service';
import { Storage } from '@ionic/storage-angular';
import { create } from 'domain';
import { promise } from 'protractor';
import { SoDetailsComponent } from '../sales-order-detail/components/so-details/so-details.component';
import { TrnSalesOrderItemModel } from 'src/app/models/trn-sales-order-item.model';
import { DeleteModalPage } from './delete-modal/delete-modal.page';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-sales-order-list',
  templateUrl: './sales-order-list.page.html',
  styleUrls: ['./sales-order-list.page.scss'],
})
export class SalesOrderListPage implements OnInit {
  token: string = "";
  dataReturned: any;

  constructor(
    private router: Router,
    private trnSalesOrderService: TrnSalesOrderService,
    private toastService: ToastService,
    private storage: Storage,
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private networkService: NetworkService
  ) {
    this.storage.get("access_token").then(
      result => {
        let token = result;
        console.log(token);
        if (token) {
          this.token = token;
        }
      }
    )
  }
 
  date = new Date();
  firstDay: string = "";
  lastDay: string = "";

  soList: any[] = [];
  isContentShow: boolean = false;

  getSODateFilter() {
    let dateStart = new Date(this.firstDay).toLocaleDateString("fr-CA");
    let endStart = new Date(this.lastDay).toLocaleDateString("fr-CA");
    this.trnSalesOrderService.getSOListByDate(this.token, dateStart, endStart).subscribe(
      data => {
        console.log(data);
        if (data.length > 0) {
          this.soList = data;
        }else{
          this.soList =[];
        }
        setTimeout(() => {
          this.isContentShow = true;
        }, 500);
      }
    );
  }
  addSO(): void {

    this.trnSalesOrderService.addSalesOrder().subscribe(
      data => {

        if (data[0] == true) {
          this.toastService.success('Sales order was successfully added!');
          console.log(data[1]);
          setTimeout(() => {
            this.storage.set("sales_id", data[1]);
            this.router.navigate(['dashboard/sales-order-detail']);
          }, 500);
        } else {
          // this.toastr.error(this.setLabel(data[1]), this.setLabel('Add Failed'));
        }

      }
    );
  }

  editSO(id) {
    this.router.navigate(['dashboard/sales-order-detail']);
    this.storage.set("sales_id", id);
  }
  
  deleteSO(id): void {

    this.trnSalesOrderService.deleteSalesOrder(id).subscribe(
      data => {

        if (data[0] == true) {
          this.toastService.success('Sales order was successfully deleted!');
          console.log(data[1]);
          this.modalController.dismiss(close);
          this.router.navigate(['dashboard/sales-order-list']);
          setTimeout(() => {
            // let tempId = this.soListPage.getSoList().find(x =>{ // refresh list
            //   return x.Id===id;
            // });
            // let index = this.soListPage.getSoList().indexOf(tempId);
            // this.soListPage.getSoList().splice(index,1)[0];
            // this.router.navigate(['dashboard/sales-order-list']);
            
          }, 500);
        } else {
          // this.toastr.error(this.setLabel(data[1]), this.setLabel('Add Failed'));
        }

      }
    );
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
        console.log(id.data.name);
        this.getSODateFilter();
      }
    });

    return await modal.present();
  }
  

  dateChange() {
    this.getSODateFilter();
    console.log(this.firstDay, this.lastDay);
  }

  async showConfirm(sOModel) { 
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
                console.log(data[1]);
                // this.router.navigate(['dashboard/sales-order-list']);
                this.getSODateFilter();
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
    this.networkService.checkNetwork();
    let _startDate =new Date(this.date.getFullYear(), this.date.getMonth(), 1).toLocaleDateString("fr-CA");
    let _endDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).toLocaleDateString("fr-CA");

    setTimeout(() => {
      this.firstDay = new Date(_startDate).toISOString();
      this.lastDay = new Date(_endDay).toISOString();
      console.log(this.firstDay, this.lastDay);
      this.getSODateFilter();
    }, 500);
  }
}
function DeleteModalComponent(DeleteModalComponent: any) {
  throw new Error('Function not implemented.');
}

