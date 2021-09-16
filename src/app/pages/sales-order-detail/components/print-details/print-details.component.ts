import { Component, OnInit } from '@angular/core';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial/ngx';
import { PrinterService } from 'src/app/services/printer/printer.service';
@Component({
  selector: 'app-print-details',
  templateUrl: './print-details.component.html',
  styleUrls: ['./print-details.component.scss'],
})
export class PrintDetailsComponent implements OnInit {
  bluetoothList:any=[];
  selectedPrinter:any;
  constructor(
    private bluetoothSerial: BluetoothSerial,
    private print:PrinterService,
  ) { 
    this.listPrinter();
  }

  
  //This will list all of your bluetooth devices
  listPrinter() { 
    this.print.searchBluetoothPrinter()
     .then(resp=>{
 
      //List of bluetooth device list
      this.bluetoothList=resp;
  });
}
//This will store selected bluetooth device mac address
selectPrinter(macAddress)
{
//Selected printer macAddress stored here
macAddress = "66:22:50:29:94:21";
this.selectedPrinter=macAddress;
}

//This will print
async printStuff()
{  
 //The text that you want to print
 var myText=
   "Sales Invoice\n" 
 + "--------------------------------" 
 + "Customer:   " + 
 + "Business Style:   " 
 + "Address:   "
 + "Contact Person:   " +
 + "Contact No:   "
 + "TIN:   \nTerm:   " 
 + "\nRemarks:   \nNo:   \nBranch:  \nDate:   \nDate Needed:   \nManual No:   \nDocument Ref:   \nSales:   \n"
 + "--------------------------------"
 
 
 await this.print.sendToBluetoothPrinter(this.selectedPrinter,myText);
}
  ngOnInit() {}

}
