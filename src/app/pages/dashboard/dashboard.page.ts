import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public pages = [
    { title: 'Sales Order', url: '/dashboard/sales-order-list', icon: 'list' },
    { title: 'Items', url: '/dashboard/item-list', icon: 'pricetag' },
    { title: 'Customers', url: '/dashboard/customer-list', icon: 'people' }
  ];
  constructor() {}

  ngOnInit() {
  }

}
