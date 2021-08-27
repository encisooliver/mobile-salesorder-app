import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

import { NgZone } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  isOnline$: Observable<boolean>;
  private statusSubject = new BehaviorSubject<boolean>(false);
  public pages = [
    { title: 'Sales Order', url: '/dashboard/sales-order-list', icon: 'list' },
    { title: 'Items', url: '/dashboard/item-list', icon: 'pricetag' },
    { title: 'Customers', url: '/dashboard/customer-list', icon: 'people' }
  ];
  constructor(
    private storage: Storage,
    private router: Router,
    private zone: NgZone,
  ) {
    Network.getStatus().then(status => this.statusSubject.next(status.connected)
    );
    this.isOnline$ = this.statusSubject.asObservable();

    Network.addListener('networkStatusChange', (status) => {
      console.log(status);
      this.zone.run(() => {
        this.statusSubject.next(status.connected);
        console.log(status.connected);
      });
    });
  }

  async getStatus(){
    const status = await Network.getStatus();
    console.log(status);
  }

  logout() {
    this.storage.remove('access_token');
    this.storage.remove('expires_in');
    this.storage.remove('username');
    this.storage.remove('fullname');
    this.storage.remove('companyId');
    this.storage.remove('company');
    this.storage.remove('branchId');
    this.storage.remove('branch');
    this.storage.remove('sales_id');
    this.storage.remove('sales_order');
    this.router.navigate(['/'])
  }

  ngOnInit() {
    this.getStatus();
  }

}
