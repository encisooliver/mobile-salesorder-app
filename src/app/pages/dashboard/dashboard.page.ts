import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

import { NgZone } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject, Observable } from 'rxjs';
import { SysStorageService } from 'src/app/services/sys-storage/sys-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  isOnline$: Observable<boolean>;
  isOnline: boolean;
  username: string = "";
  fullname: string = "";
  private statusSubject = new BehaviorSubject<boolean>(false);
  public pages = [
    { title: 'SALES ORDER', url: '/dashboard/sales-order-list', icon: 'list' },
    { title: 'SO PARKING', url: '/dashboard/sales-order-list-local', icon: 'list' },
    { title: 'ITEMS', url: '/dashboard/item-list', icon: 'pricetag' },
    { title: 'CUSTOMER', url: '/dashboard/customer-list', icon: 'people' },
  ];
  constructor(
    private storage: Storage,
    private router: Router,
    private zone: NgZone,
    private sysStorageService: SysStorageService
  ) {
    Network.getStatus().then((status) => {
      console.log('isOnline', status.connected);
      this.isOnline = status.connected;
    });

    Network.addListener('networkStatusChange', (status) => {
      this.zone.run(() => {
        console.log('isOnline', status.connected);
        this.isOnline = status.connected;
      });
    });

    this.storage.get("username").then(
      result => {
        let token = result;
        if (token) {
          this.username = token;
        }
      }
    )
    this.storage.get("fullname").then(
      result => {
        let token = result;
        if (token) {
          this.fullname = token;
        }
      }
    )
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

  async ngOnInit() {
    // this.getStatus();
  }

}
