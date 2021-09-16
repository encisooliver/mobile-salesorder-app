import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrnSalesOrderModel } from 'src/app/models/trn-sales-order.model';
import { TrnSalesOrderService } from 'src/app/services/trn-sales-order/trn-sales-order.service';
import { Storage } from '@ionic/storage-angular';
import { SysStorageService } from 'src/app/services/sys-storage/sys-storage.service';
import { TrnSalesOrderItemModel } from 'src/app/models/trn-sales-order-item.model';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { SalesOrder } from 'src/app/models/sales-order.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { SalesOrderService } from 'src/app/services/sales-order/sales-order.service'

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
// import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { Platform } from '@ionic/angular';
// import { async } from '@angular/core/testing';
// import { Directory } from '@capacitor/filesystem';
// import {Plugins} from '@capacitor/core';
// import { File } from '@ionic-native/File/ngx';
// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
// import { PrinterService } from 'src/app/services/printer/printer.service';
// const {Filesystem, Share} = Plugins;
// import {BluetoothSerial} from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales-order-detail.page.html',
  styleUrls: ['./sales-order-detail.page.scss'],
})
export class SalesOrderDetailPage implements OnInit {
  sales_id: number = 0;
  FileOpener
  bluetoothList: any = [];
  selectedPrinter: string = "";
  public working: string;

  @Input() sOData: TrnSalesOrderModel[] = [];
  isShown = true;
  salesOrderHidden = false;
  soItemHidden = true;
  sub: any;
  constructor(
    private router: Router,
    // private print:PrinterService,
    private route: ActivatedRoute,
    private trnSalesOrderService: TrnSalesOrderService,
    private storage: Storage,
    private toastService: ToastService,
    private decimalPipe: DecimalPipe,
    private salesOrderService: SalesOrderService,
    private sysStorageService: SysStorageService,
    // private fileOpener: FileOpener,
    // private plt: Platform,
    // private file: File,
    // private ft: FileTransfer,
    // private document: DocumentViewer,
    // private bluetoothSerial: BluetoothSerial,
  ) {
    this.listPrinter();
  }
  //This will list all of your bluetooth devices
  listPrinter() {
    // this.print.searchBluetoothPrinter()
    //   .then(resp => {

    //     //List of bluetooth device list
    //     this.bluetoothList = resp;
    //   });
  }
  //This will store selected bluetooth device mac address
  selectPrinter(macAddress) {
    //Selected printer macAddress stored here
    this.selectedPrinter = macAddress;
  }
  trnSalesOrderModel = new TrnSalesOrderModel()
  //This will print
  printStuff() {

    //The text that you want to print
    this.selectedPrinter = this.selectedPrinter == "" || this.selectedPrinter == null ? "66:22:50:29:94:21" : this.selectedPrinter;
    console.log(this.selectedPrinter)
    console.log(this.salesOrder.SONumber);
    this.soDate = new Date(this.salesOrder.SODate).toISOString();
    this.neededDate = new Date(this.salesOrder.DateNeeded).toISOString();
    let myText =
      "--------------------------------\n"
      + "         Sales Details\n"
      + "--------------------------------"
      + "SO Number:   " + this.salesOrder.SONumber
      + "\nSO Date:   " + this.soDate
      + "\nCustomer:   " + this.salesOrder.CustomerName
      + "\nTerm:   " + this.salesOrder.TermId
      + "\nDiscount:   " + this.salesOrder.SOItems[0].DiscountAmount
      + "\n--------------------------------"
      + "         Sales Invoice"
      + "\n--------------------------------"
      + "\nCustomer:   " + this.salesOrder.CustomerName
      + "\nBusiness Style:   "
      + "\nAddress:   "
      + "\nContact Person:   "
      + "\nContact No:   "
      + "\nTIN:   "
      + "\nTerm:   " + this.salesOrder.TermId
      + "\nRemarks:   " + this.salesOrder.Remarks
      + "\nSO No:   " + this.salesOrder.SONumber
      + "\nBranch:   " + this.salesOrder.BranchName
      + "\nDate:   " + this.soDate
      + "\nDate Needed:   " + this.neededDate
      + "\nManual No:   " + this.salesOrder.ManualNumber
      + "\nDocument Ref:   "
      + "\nSales:   "
      //     let quantity,  amount =0;
      //     let item, unit = '';
      //  for(let i = 0 ; i<this.salesOrder.SOItems.length;i++){
      //   quantity += this.salesOrder.SOItems[i].VATId;
      //   amount += this.salesOrder.SOItems[i].Price;
      //   item += this.salesOrder.SOItems[i].ItemDescription;
      //   unit += this.salesOrder.SOItems[i].UnitId;
      //  }
      + "\n--------------------------------"
      + "          Item Detail\n"
      + "--------------------------------"
      + "Item:   " + this.salesOrder.SOItems[0].ItemDescription
      + "\nQuantity:   " + this.salesOrder.SOItems[0].Quantity
      + "\nUnit:   " + this.salesOrder.SOItems[0].UnitId
      + "\nAmount:   \n" + this.salesOrder.SOItems[0].Price
    //  let vat_sales, exempt_sales, rated =0;
    //  for(let i = 0 ; i<this.salesOrder.SOItems.length;i++){
    //    vat_sales += this.salesOrder.SOItems[i].VATId;
    //    exempt_sales += this.salesOrder.IsCancelled;
    //  }
    //  + "\nVATable Sales: " + this.salesOrder.SOItems[0].
    //  + "\nVAT Exempt Sales: "
    //  + "\nZero Rated Sales: "
    //  + "\nVAT Amount: "
    //  + "\nTotal Sales (VAT Inclusive):"
    //  + "\nLess VAT: "
    //  + "\nAmount Net of VAT:"
    //  + "\nLess SC/PWD Discount:"
    //  + "\nTOTAL AMOUNT DUE:"

    console.log(myText);
    // this.print.sendToBluetoothPrinter(this.selectedPrinter,myText);
  }

  action: string = "";
  token: string = "";

  salesOrder: TrnSalesOrderModel = new TrnSalesOrderModel();
  soAmount: string = "0.00"
  sOItems: TrnSalesOrderItemModel[] = [];
  salesOrderLocalModel: SalesOrder = {
    Id: 0,
    SalesOrder: new TrnSalesOrderModel(),
  };
  destination: string = "Cloud Storage"
  soDate: String = "";
  neededDate: String = "";
  async saveSO() {
    this.salesOrder.SOItems = await this.sOItems;
    this.salesOrderLocalModel.SalesOrder = await this.salesOrder;

    if (this.destination == "Cloud Storage") {
      if (this.action == "Add") {
        await this.salesOrderService.addSalesOrder(this.salesOrder).subscribe(
          data => {
            if (data[0] == true) {
              this.salesOrder.Id = data[1].Id;
              this.salesOrderLocalModel.SalesOrder = this.salesOrder;
              this.action == "Update";
              this.toastService.success('Sales order was successfully updated!');
              this.back();
            } else {
              this.destination = "Local Storage";
              this.toastService.success('Network problem, SO Parking!');
              this.saveSOToLocal();
            }
          }
        );
      }
      else {
        await this.salesOrderService.saveSalesOrder(this.salesOrder).subscribe(
          data => {
            if (data[0] == true) {
              this.toastService.success('Sales order was successfully updated!');
              this.back();
            } else {
              this.destination = "Local Storage";
              this.toastService.success('Network problem, SO Parking!');
              this.saveSOToLocal();
            }
          }
        );
      }
    } else {
      await this.saveSOToLocal();
    }
  }

  saveSOToLocal() {
    this.salesOrder.SOItems = this.sOItems;
    this.salesOrderLocalModel.SalesOrder = this.salesOrder;
    if (this.salesOrderLocalModel.Id == 0) {
      this.sysStorageService.addSO(this.salesOrderLocalModel).then(data => {
        this.salesOrderLocalModel = data;
        this.back();
      });
    } else {
      this.sysStorageService.updateSO(this.salesOrderLocalModel).then(data => {
        this.salesOrderLocalModel = data;
        this.back();
      });
    }
  }

  // event method
  receiveItemEvent(items: any) {
    let _items = items.soItems;
    let _amount = items.amount;
    setTimeout(() => {
      this.sOItems = _items;
      this.sOItems = _items;
      this.salesOrder.SOItems = _items;
      this.salesOrder.Amount = _amount;
      console.log(this.salesOrder);
      console.log(this.salesOrder);
      this.soAmount = this.decimalPipe.transform(this.salesOrder.Amount, "1.2-2");
    }, 100);
  }
  receiveSODetailEvent(so_detail: any) {
    let _salesOrder = so_detail;
    this.salesOrder = _salesOrder;
    console.log(this.salesOrder);
  }

  showsalesOrder() {
    setTimeout(() => {
      this.salesOrderHidden = false;
      this.soItemHidden = true;
    }, 300);
  }
  showSOItem() {
    console.log("fire!");
    setTimeout(() => {
      this.salesOrderHidden = true;
      this.soItemHidden = false;
    }, 300);
  }
  back() {
    let _destination = this.destination;
    if (_destination == "Cloud Storage") {
      this.router.navigate(['dashboard/sales-order-list']);
    } else {
      this.router.navigate(['dashboard/sales-order-list-local']);
    }
  }
  ngOnInit() {

    this.storage.get("access_token").then(
      result => {
        let token = result;
        if (token) {
          this.token = token;
        }
      }
    )

    this.sub = this.route.queryParams.subscribe(params => {
      if (params != null) {

        let destination = params['destination'];
        this.destination = destination;

        let action = params['action'];
        console.log(action);

        if (action != null) this.action = action;
        if (destination == "Local Storage") {

          let so = JSON.parse(params['salesOrderData']);
          if (so != null) {
            this.salesOrderLocalModel = so;
            this.salesOrder = this.salesOrderLocalModel.SalesOrder;
            this.soAmount = this.decimalPipe.transform(this.salesOrder.Amount, "1.2-2");
          }
          setTimeout(() => {
            this.isShown = true;
            this.salesOrderHidden = false;
            this.soItemHidden = true;
          }, 500);

        } else {

          let so = JSON.parse(params['salesOrderData']);
          console.log(so);
          if (so != null) {
            this.salesOrder = so;
            this.salesOrder.Id = so.Id;
            this.salesOrder.BranchManualCode = so.BranchManualCode;
            this.salesOrder.BranchName = so.BranchName;
            this.salesOrder.CurrencyId = so.CurrencyId;
            this.salesOrder.ExchangeRate = so.ExchangeRate;
            this.salesOrder.ExchangeCurrency = so.ExchangeCurrency;
            this.salesOrder.ExchangeCurrencyManualCode = so.ExchangeCurrencyManualCode;
            this.salesOrder.SONumber = so.SONumber;
            this.salesOrder.SODate = so.SODate;
            this.salesOrder.ManualNumber = so.ManualNumber;
            this.salesOrder.DocumentReference = so.DocumentReference;
            this.salesOrder.CustomerId = so.CustomerId;
            this.salesOrder.CustomerName = so.CustomerName;
            this.salesOrder.TermId = so.TermId;
            this.salesOrder.DiscountId = so.DiscountId;
            this.salesOrder.DiscountRate = so.DiscountRate;
            this.salesOrder.DateNeeded = so.DateNeeded;
            this.salesOrder.Remarks = so.Remarks;
            this.salesOrder.SoldByUserId = so.SoldByUserId;
            this.salesOrder.SoldByUserFullname = so.SoldByUserFullname;
            this.salesOrder.PreparedByUserId = so.PreparedByUserId;
            this.salesOrder.PreparedByUserFullname = so.PreparedByUserFullname;
            this.salesOrder.CheckedByUserId = so.CheckedByUserId;
            this.salesOrder.CheckedByUserFullname = so.CheckedByUserFullname;
            this.salesOrder.ApprovedByUserId = so.ApprovedByUserId;
            this.salesOrder.ApprovedByUserFullname = so.ApprovedByUserFullname;
            this.salesOrder.Amount = so.Amount;
            this.soAmount = this.decimalPipe.transform(this.salesOrder.Amount, "1.2-2");
            this.salesOrder.Status = so.Status;
            this.salesOrder.IsCancelled = so.IsCancelled;
            this.salesOrder.IsPrinted = so.IsPrinted;
            this.salesOrder.IsLocked = so.IsLocked;
            this.salesOrder.CreatedByUserFullname = so.CreatedByUserFullname;
            this.salesOrder.CreatedDateTime = so.CreatedDateTime;
            this.salesOrder.UpdatedByUserFullname = so.UpdatedByUserFullname;
            this.salesOrder.UpdatedDateTime = so.UpdatedDateTime;
            this.salesOrder.SOItems = so.SOItems;
            console.log(this.salesOrder);
            setTimeout(() => {
              this.isShown = true;
              this.salesOrderHidden = false;
              this.soItemHidden = true;
            }, 500);
          }
        }


      }
    });
    // this.loadLocalAssetToBase64();

  }
  // pdfObj = null;

  // pdf() {
  //   const docDef = {
  //     pageSize: 'A4',
  //     pageOrientation: 'portrait',
  //     pageMargin: [20, 10, 40, 60],
  //     content: [
  //       {
  //         text: [
  //           {text: 'Easy Company\n', bold: true, fontSize: 14 },
  //           {text: 'Japan', bold: true, fontSize: 10},

  //         ]
  //       },
  //       {
  //         table : {
  //             headerRows : 1,
  //             widths: [515],
  //             body : [
  //                     [''],
  //                     ['']
  //                     ]
  //         },
  //         layout : 'headerLineOnly'
  //       },
  //       {
  //         text: 'Sales Invoice', alignment: 'center' 
  //       },
  //       {
  //         table : {
  //             headerRows : 1,
  //             widths: [515],
  //             body : [
  //                     [''],
  //                     ['']
  //                     ]
  //         },
  //         layout : 'headerLineOnly'
  //       },
  //       {
  //         columns: [      
  //           {
  //             // text: 'Customer: \nBusiness Style: \nAddress: \nContact Person: \nContact No: \nTIN: \n\nTerm: \n\nRemarks:',
  //             text: [
  // 							{text: 'Customer:\n', bold: true, fontSize: 10, alignment: 'left',margin: [20, 0, 40, 0]},
  // 							{text: 'Business Style:\n', bold: true, fontSize: 10, alignment: 'left',margin: 0},
  //               {text: 'Address:\n', bold: true, fontSize: 10, alignment: 'left',margin: 0},
  //               {text: 'Contact Person:\n', bold: true, fontSize: 10, alignment: 'left',margin: 0},
  //               {text: 'Contact No:\n', bold: true, fontSize: 10, alignment: 'left',margin: 0},
  //               {text: 'TIN:\n', bold: true, fontSize: 10, alignment: 'left',margin: 0},
  //               {text: 'Term:\n', bold: true, fontSize: 10, alignment: 'left',margin: 0},
  //               {text: 'Remarks:\n', bold: true, fontSize: 10, alignment: 'left'},
  //             ]
  //           },
  //           {
  //             // text: 'No: \nBranch: \nDate \nDate Needed: \nManual No: \nDocument Ref: \n\nSales:'
  //             text: [
  // 							{text: 'No:\n', bold: true, fontSize: 10 },
  // 							{text: 'Branch:\n', bold: true, fontSize: 10},
  //               {text: 'Date:\n', bold: true, fontSize: 10},
  //               {text: 'Date Needed:\n', bold: true, fontSize: 10},
  //               {text: 'Manual No:\n', bold: true, fontSize: 10},
  //               {text: 'Document Ref:\n', bold: true, fontSize: 10},
  //               {text: 'Sales:\n', bold: true, fontSize: 10},
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         table : {
  //             headerRows : 1,
  //             widths: [515],
  //             body : [
  //                     [''],
  //                     ['']
  //                     ]
  //         },
  //         layout : 'headerLineOnly'
  //       },
  //       {
  //         style: 'tableExample',
  //         table: {
  //           headerRows: 1,
  //           body: [
  //             [{text: 'QTY.', style: 'tableHeader'}, {text: 'Unit', style: 'tableHeader'}, {text: 'Item', style: 'tableHeader'}
  //             , {text: 'Particulars', style: 'tableHeader'} , {text: 'Price', style: 'tableHeader'} , {text: 'Amount', style: 'tableHeader'}],
  //             ['Sample value 1', 'Sample value 2', 'Sample value 3' , 'Sample value 4' , 'Sample value 5' , 'Sample value 6'],
  //           ]
  //         },
  //         layout: 'lightHorizontalLines'
  //       },
  //       {
  //         table : {
  //             headerRows : 1,
  //             widths: [515],
  //             body : [
  //                     [''],
  //                     ['']
  //                     ]
  //         },
  //         layout : 'headerLineOnly'
  //       },
  //       {
  //         text: 'TOTAL:', alignment: 'right', margin: [ 0, 0, 120, 0 ] 
  //       },
  //       {
  //         table : {
  //             headerRows : 1,
  //             widths: [515],
  //             body : [
  //                     [''],
  //                     ['']
  //                     ]
  //         },
  //         layout : 'headerLineOnly'
  //       },
  //     ]

  //   }

  //   this.pdfObj = pdfMake.createPdf(docDef)
  //   const storage = this.file.dataDirectory;
  //   const pdfFile = "demo.pdf";

  //   this.file.checkFile(storage,pdfFile).then((res) =>{
  //     const result =  Filesystem.writeFile({
  //               storage,
  //               data: res,
  //               directory: Directory.Documents,
  //               recursive: true
  //             });
  //             console.log("File generated" + JSON.stringify(res));
  //             this.fileOpener.open(this.file.dataDirectory + pdfFile, 'application/pdf');
  //   });

  //   if(this.plt.is("android")){
  //     this.pdfObj.getBase64(async (data) =>{
  //       try{
  //         let path = 'www/assets';

  //         const result = await Filesystem.writeFile({
  //           path,
  //           data: data,
  //           directory: Directory.Documents,
  //           recursive: true
  //         });
  //         this.fileOpener.open('${result.url}', 'application/pdf');
  //         console.log(result);
  //         console.log("result");
  //       }catch(e){
  //         console.log("Unable to write")
  //       }
  //     });
  //   }else{
  //     this.pdfObj.download('demo.pdf');
  //   }
  // }
  // makePdf() {
  //   let self = this;
  //   pdfMake.vfs = pdfFonts.pdfMake.vfs;
  //   var docDefinition = {
  //   content: [
  //   {
  //   columns: [
  //   {
  //   },
  //   [
  //   { text: 'BITCOIN', style: 'header' },
  //   { text: 'Cryptocurrency Payment System', style: 'sub_header' },
  //   { text: 'WEBSITE: https://bitcoin.org/', style: 'url' },
  //   ]
  //   ]
  //   }
  //   ],
  //   styles: {
  //   header: {
  //   bold: true,
  //   fontSize: 20,
  //   alignment: 'right'
  //   },
  //   sub_header: {
  //   fontSize: 18,
  //   alignment: 'right'
  //   },
  //   url: {
  //   fontSize: 16,
  //   alignment: 'right'
  //   }
  //   },
  //   pageSize: 'A4',
  //   pageOrientation: 'portrait'
  //   };
  //   pdfMake.createPdf(docDefinition).getBuffer(function (buffer) {
  //   let utf8 = new Uint8Array(buffer);
  //   let binaryArray = utf8.buffer;
  //   self.saveToDevice(binaryArray,"Bitcoin.pdf")
  //   });
  //   }
  //   saveToDevice(data:any,savefile:any){
  //   let self = this;
  //   self.file.writeFile(self.file.externalDataDirectory, savefile, data, {replace:true});
  //   const toast = self.toastCtrl.create({
  //   message: 'File saved to your device',
  //   duration: 3000,
  //   position: 'top'
  //   });
  //   toast.present();
  //   }
  // downloadPDF(){
  //   const transfer = this.ft.create();
  //   // let downloadURL = 'http://www.africau.edu/images/default/sample.pdf';
  //     const url = 'http://www.africau.edu/images/default/sample.pdf';
  //     transfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
  //       console.log('download complete: ' + entry.toURL());
  //     }, (error) => {
  //       // handle error
  //     });
  //   // let path = this.file.dataDirectory;
  //   // const transfer = this.ft.create();

  //   // transfer.download(downloadURL, '${path}myfile.pdf').then(entry => {
  //   //   let pdf = entry.toUrl();
  //   //   if(this.plt.is('android')){

  //   //     this.document.viewDocument(pdf, 'application/pdf', {});
  //   //   }else{
  //   //     this.fileOpener.open(pdf, 'application/pdf');
  //   //   }
  //   // });
  // }

  // openPDF(){
  //   let filePath = this.file.applicationDirectory + 'www/assets';
  //   if(this.plt.is('android')){
  //     let fakeName = Date.now();
  //     this.file.copyFile(filePath, 'mobiledemo.pdf', this.file.dataDirectory, '${fakeName}.pdf').then(result =>{
  //       this.fileOpener.open(result.nativeURL, 'application/pdf');
  //     });
  //   }else{
  //     const options: DocumentViewerOptions = {
  //       title: 'My PDF'
  //     }
  //     this.document.viewDocument('${filePath}/mobiledemo.pdf', 'application/pdf', options);
  //   }
  // }
  ngDestroy(): void {
    this.sub.unsubscribe();
  }
}
