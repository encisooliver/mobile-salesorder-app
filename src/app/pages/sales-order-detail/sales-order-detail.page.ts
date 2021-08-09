import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrnSalesOrderModel } from 'src/app/models/trn-sales-order.model';
import { TrnSalesOrderService } from 'src/app/services/trn-sales-order/trn-sales-order.service';

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales-order-detail.page.html',
  styleUrls: ['./sales-order-detail.page.scss'],
})
export class SalesOrderDetailPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  

  ngOnInit() {
    console.log(this.router.url)
    let id = this.route.snapshot.params['id'];
    console.log(id);
  }
}
