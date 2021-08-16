import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-so-item-detail',
  templateUrl: './so-item-detail.page.html',
  styleUrls: ['./so-item-detail.page.scss'],
})
export class SoItemDetailPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }




  ngOnInit() {
  }
  dismiss() {  
    this.modalController.dismiss();  
  }  
}
