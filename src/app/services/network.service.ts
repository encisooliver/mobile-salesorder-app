import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Network } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() { 
    
  }

  public checkNetwork() {
    // Network.addListener('networkStatusChange', function (val) {
    //   console.log(val);
    //   console.log(val.connected);
    //   if (val.connected) {
    //     return true;
    //   }
    //   else {
    //     return false;
    //   }
    // });
  }
}
