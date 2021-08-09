import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular'
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }
  public async success(message: string){
    const toast = await this.toastController.create({
      message:message,
      position: 'bottom',
      duration: 1000,
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    toast.present();
  }
}
