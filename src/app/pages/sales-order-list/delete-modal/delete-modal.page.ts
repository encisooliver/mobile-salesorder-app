import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TrnSalesOrderService } from 'src/app/services/trn-sales-order/trn-sales-order.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { SalesOrderListPage } from '../sales-order-list.page';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.page.html',
  styleUrls: ['./delete-modal.page.scss'],
})
export class DeleteModalPage implements OnInit {

  @Input() model_title: number; 
  @Input() soNumber: number;
  @Input() cName: any;

  constructor(
    private modalController: ModalController,
    private trnSalesOrderService: TrnSalesOrderService,
    private toastService: ToastService,
    private router: Router,
    public alertController: AlertController
    // public soListPage: SalesOrderListPage
    ) { }

  ngOnInit() {
  }


  // async closeModel() {
  //   const close: string = "Modal Removed";
  //   await this.modalController.dismiss(close);
  //   this.router.navigate(['dashboard/sales-order-list']);
  // }

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

}
