import { Component, OnInit } from '@angular/core';
import { TrnSalesOrderService } from './../../services/trn-sales-order/trn-sales-order.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from './../../shared/toast/toast.service';
import { Storage } from '@ionic/storage-angular';
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
  firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toLocaleDateString("fr-CA");
  lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).toLocaleDateString("fr-CA");

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
        }
      }
    );
  }

  addSO(): void {
    this.router.navigate(['dashboard/sales-order-detail']);

    // this.trnSalesOrderService.addSalesOrder().subscribe(
    //   data => {

    //     if (data[0] == true) {
    //       this.toastService.success('Sales order was successfully added!');
    //       console.log( data[1]);
    //       setTimeout(() => {
    //         this.router.navigate(['/sales-order-detail' + data[1]]);
    //       }, 500);
    //     } else {
    //       // this.toastr.error(this.setLabel(data[1]), this.setLabel('Add Failed'));
    //     }

    //   }
    // );
  }

  editSO(id) {
    this.router.navigate(['dashboard/sales-order-detail']);
    this.storage.set("sales_id", id);
  }

  dateChange() {
    this.getSODateFilter();
    console.log(this.firstDay, this.lastDay);
  }


  ngOnInit() {
    setTimeout(() => {
      this.getSODateFilter();
    }, 500);
  }
}
