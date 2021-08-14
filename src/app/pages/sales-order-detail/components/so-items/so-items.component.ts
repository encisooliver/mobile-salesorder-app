import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SoInventoryItemListComponent } from '../so-inventory-item-list/so-inventory-item-list.component';

@Component({
  selector: 'app-so-items',
  templateUrl: './so-items.component.html',
  styleUrls: ['./so-items.component.scss'],
})
export class SoItemsComponent implements OnInit {

  constructor(private router: Router,
    private modalCtrl: ModalController,) { }

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
    });
  }

  ngOnInit() {
    console.log(this.router.url)
  }

}
