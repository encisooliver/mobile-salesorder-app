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
import JSPDF from 'jspdf';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AlertController, LoadingController, ModalController, NavParams, Platform, ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { Directory, FilesystemDirectory } from '@capacitor/filesystem';
import {Plugins} from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { File,IWriteOptions  } from '@ionic-native/File/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { HttpClient } from '@angular/common/http';
import { Filesystem} from '@capacitor/filesystem';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import domtoimage from 'dom-to-image';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { PrinterService } from 'src/app/services/printer/printer.service';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales-order-detail.page.html',
  styleUrls: ['./sales-order-detail.page.scss'],
})
export class SalesOrderDetailPage implements OnInit {
    logoData = null;
    base64Image = null;
    photoPreview = null;
    downloadUrl = '';
    myFiles = [];
    downloadProgress = 0;
    bluetoothList:any=[];
    selectedPrinter:any;
    unpairedDevices: any;
    pairedDevices: any;
    gettingDevices: boolean;
    receipt: any;
  inputData: any = {};
  printerList:any=[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private trnSalesOrderService: TrnSalesOrderService,
    private sysStorageService: SysStorageService,
    private storage: Storage,
    private toastService: ToastService,
    private decimalPipe: DecimalPipe,
    private salesOrderService: SalesOrderService,
    private fileOpener: FileOpener,
    private plt: Platform,
    private file: File,
    private document: DocumentViewer,
    private http: HttpClient,
    private iab: InAppBrowser,
    private ft: FileTransfer,
    private alertCtrl: AlertController,
    private btSerial: BluetoothSerial,
    private print:PrinterService,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private printer: Printer,
    private modalCtrl: ModalController,
    private datepipe: DatePipe,
  ) {
    btSerial.enable();
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
    this.selectedPrinter=macAddress;
    }
    trnSalesOrderModel = new TrnSalesOrderModel()
    //This will print
    async printStuff()
    {
      
     //The text that you want to print
     this.selectedPrinter = this.selectedPrinter == "" || this.selectedPrinter == null? "66:22:50:29:94:21": this.selectedPrinter;
      console.log(this.selectedPrinter)
      console.log(this.salesOrder.SONumber);
      let totalNumberofItems : TrnSalesOrderItemModel[]=[];
      // this.datepipe.traneededDate = new Date(this.salesOrder.DateNeeded).toISOString();
 
       console.log(totalNumberofItems);
       console.log(totalNumberofItems.length);
      //  let myText=" THREESIXTY PHARMCACY"
      //  +"Operated by: Blue Ocean Holdings, Inc."
      //  +"Basak LapuLapu Branch"
      //  + "Basak, LapuLapu City"
      //  +"Tel. No. 495-6161, 520-9272"
      //  let temp_water_total, water_price, temp_water_qty, temp_nestea_total, nestea_price, temp_nestea_qty = 0;
      //  let w_description, n_description = "";
      //  let itemsCount = [];
      //  let itemListDisplay: TrnSalesOrderItemModel[] = [];
       
      //  for(let i = 0 ; i<this.salesOrder.SOItems.length;i++){
      //    if(this.salesOrder.SOItems[i].ItemId ==  309){
      //      w_description = this.salesOrder.SOItems[i].ItemDescription;
      //      temp_water_qty += this.salesOrder.SOItems[i].Quantity;
      //      water_price = this.salesOrder.SOItems[i].Price;
      //    } 
      //    if(this.salesOrder.SOItems[i].ItemId ==  310){
      //      n_description = this.salesOrder.SOItems[i].ItemDescription;
      //      temp_nestea_qty += this.salesOrder.SOItems[i].Quantity;
      //      nestea_price = this.salesOrder.SOItems[i].Price;
      //    }
      //   }
      //   temp_water_total = water_price * temp_water_qty;
      //   temp_nestea_total = nestea_price * temp_nestea_qty;
      //   if(temp_water_total != 0){
      //    itemsCount.push(temp_water_total);
      //   }
      //   if(temp_nestea_total != 0){
      //    itemsCount.push(temp_nestea_total);
      //   }
      //   console.log(w_description);
      //   console.log(temp_water_qty);
      //   console.log(w_description);
      //   console.log(n_description);
      //   console.log(itemsCount.length);
      let myText=
       "      Easyfis Corporation       "
     + "          Cebu City             " 
     + "      TIN: 000-000-000-000      " 
     + "       SN: 000000000000         " 
     + "      MIN: 000000000000         " 
     + " O F F I C I A L R E C E I P T  " 
     + "         " + this.salesOrder.SONumber
     + "\n         " + this.formatDate(this.salesOrder.SODate)
     + "\n\n--------------------------------\n"
     + "ITEM                    Amount  \n";
     let itemsText: string = "";
     let temp_total: number = 0;
     let itemTotal: number = 0;
     for(let i = 0 ; i<this.salesOrder.SOItems.length;i++){
     temp_total += this.salesOrder.SOItems[i].Price;
     itemTotal = this.salesOrder.SOItems[i].Price * this.salesOrder.SOItems[i].Quantity;
     itemsText += "\n" +this.salesOrder.SOItems[i].ItemDescription + "\t\t\t" 
      +itemTotal.toFixed(2)+
      "\n"+this.salesOrder.SOItems[i].Quantity+
      " "+this.salesOrder.SOItems[i].UnitId+
      " @ "+this.salesOrder.SOItems[i].Price.toFixed(2);
    }
    myText  += itemsText;

    let extra: string = "";
    myText += "\n--------------------------------\n"
     + "Total Sales: \t\t" +temp_total.toFixed(2)
     + "\nTotal Discount:"
     + "\nNet Sales:"
     + "\nTotal No. of Item(s): \t\t   " + this.salesOrder.SOItems.length
     + "\n--------------------------------"
     + "\nCustomer: \t       " + this.salesOrder.CustomerName + "\n\n\n";
    myText += extra

    const confirm  = await this.alertCtrl.create({
      header: 'Printing',
      message: 'Please wait!',
      buttons: [{
        text: 'Confirm',
        role: 'Confirm',
        handler: () => {
        }
      }]
    });
    //  await confirm.present();
    //  + this.salesOrder.SOItems[0].ItemDescription + "\n  "
    //  + this.salesOrder.SOItems[0].Quantity + this.salesOrder.SOItems[0].UnitId;
    //  + " @ " +
    //  + "\n--------------------------------\n"
    //  + "Total Sales:"
    //  + "\nTotal Discount:"
    //  + "\nNet Sales:"
    //  + "\nTotal No. of Item(s):"
    //  + "\n--------------------------------\nCustomer:   " + this.salesOrder.CustomerName;
     
    //  + "SO Number:   " + this.salesOrder.SONumber
    //  + "\nSO Date:   " + this.soDate
    //  + "\nCustomer:   " + this.salesOrder.CustomerName
    //  + "\nTerm:   "     + this.salesOrder.TermId
    //  + "\nDiscount:   " + this.salesOrder.SOItems[0].DiscountAmount

    //     let quantity,  amount =0;
    //     let item, unit = '';
    //  for(let i = 0 ; i<this.salesOrder.SOItems.length;i++){
    //   quantity += this.salesOrder.SOItems[i].VATId;
    //   amount += this.salesOrder.SOItems[i].Price;
    //   item += this.salesOrder.SOItems[i].ItemDescription;
    //   unit += this.salesOrder.SOItems[i].UnitId;
    //  }
    //  + "\n--------------------------------"
    //  + "Item\n"
    //  + "Item:   " + this.salesOrder.SOItems[0].ItemDescription
    //  + "\nQuantity:   " + this.salesOrder.SOItems[0].Quantity
    //  + "\nUnit:\n" + this.salesOrder.SOItems[0].UnitId
    //  + "Amount: " + this.salesOrder.SOItems[0].Price;
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
        this.print.sendToBluetoothPrinter(this.selectedPrinter,myText);
    }

  formatDate(date) {
      return this.datepipe.transform(date, "mm/dd/yyyy")
  }
  async showToast(data) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: data,
      position: 'bottom',
    });
    (await toast).present();
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
  isShown: boolean = false;
  salesOrderHidden: boolean = false;
  soItemHidden: boolean = true;
  sub: any;

  getSO() {
    let id = this.route.snapshot.params['id'];
    console.log(id);
    this.trnSalesOrderService.getSalesOrderDetail(id, this.token).subscribe(
      data => {
        if (data != null) {
          this.salesOrder.Id = data.Id;
          this.salesOrder.BranchManualCode = data.BranchManualCode;
          this.salesOrder.BranchName = data.BranchName;
          this.salesOrder.CurrencyId = data.CurrencyId;
          this.salesOrder.ExchangeRate = data.ExchangeRate;
          this.salesOrder.ExchangeCurrency = data.ExchangeCurrency;
          this.salesOrder.ExchangeCurrencyManualCode = data.ExchangeCurrencyManualCode;
          this.salesOrder.SONumber = data.SONumber;
          this.salesOrder.SODate = data.SODate;
          this.soDate = new Date(this.salesOrder.SODate).toISOString();
          this.salesOrder.ManualNumber = data.ManualNumber;
          this.salesOrder.DocumentReference = data.DocumentReference;
          this.salesOrder.CustomerId = data.CustomerId;
          this.salesOrder.CustomerName = data.CustomerName;
          this.salesOrder.TermId = data.TermId;
          this.salesOrder.DiscountId = data.DiscountId;
          this.salesOrder.DiscountRate = data.DiscountRate;
          this.salesOrder.DateNeeded = data.DateNeeded;
          this.neededDate = new Date(this.salesOrder.DateNeeded).toISOString();
          this.salesOrder.Remarks = data.Remarks;
          this.salesOrder.SoldByUserId = data.SoldByUserId;
          this.salesOrder.SoldByUserFullname = data.SoldByUserFullname;
          this.salesOrder.PreparedByUserId = data.PreparedByUserId;
          this.salesOrder.PreparedByUserFullname = data.PreparedByUserFullname;
          this.salesOrder.CheckedByUserId = data.CheckedByUserId;
          this.salesOrder.CheckedByUserFullname = data.CheckedByUserFullname;
          this.salesOrder.ApprovedByUserId = data.ApprovedByUserId;
          this.salesOrder.ApprovedByUserFullname = data.ApprovedByUserFullname;
          this.salesOrder.Amount = data.Amount;
          this.salesOrder.Status = data.Status;
          this.salesOrder.IsCancelled = data.IsCancelled;
          this.salesOrder.IsPrinted = data.IsPrinted;
          this.salesOrder.IsLocked = data.IsLocked;
          this.salesOrder.CreatedByUserFullname = data.CreatedByUserFullname;
          this.salesOrder.CreatedDateTime = data.CreatedDateTime;
          this.salesOrder.UpdatedByUserFullname = data.UpdatedByUserFullname;
          this.salesOrder.UpdatedDateTime = data.UpdatedDateTime;
          console.log(this.salesOrder);
          setTimeout(() => {
            this.isShown = true;
            this.salesOrderHidden = false;
            this.soItemHidden = true;
          }, 500);
        }

      }
    );
  }

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

  pdfObj = null;

  async pdf(binaryArray: any) {
    const docDef = {
      // pageSize: 192,
      pageSize: {
        width: 192,
        height: 'auto'
      },
      pageOrientation: 'portrait',
      content: [
        {
        text: 'Sales Invoice', 
        alignment: 'center',
        fontSize: 10
        },
        {
          table : {
              headerRows : 1,
              widths: [515],
              body : [
                      [''],
                      ['']
                      ]
          },
          layout : 'headerLineOnly'
        },
        {
          columns: [      
            {
              // text: 'Customer: \nBusiness Style: \nAddress: \nContact Person: \nContact No: \nTIN: \n\nTerm: \n\nRemarks:',
              text: [
								{text: 'Customer:\n', bold: true, fontSize: 8, alignment: 'left',margin: [20, 0, 40, 0]},
								{text: 'Business Style:\n', bold: true, fontSize: 8, alignment: 'left',margin: [20, 0, 40, 0]},
                {text: 'Address:\n', bold: true, fontSize: 8, alignment: 'left',margin: [20, 0, 40, 0]},
                {text: 'Contact Person:\n', bold: true, fontSize: 8, alignment: 'left',margin: [20, 0, 40, 0]},
                {text: 'Contact No:\n', bold: true, fontSize: 8, alignment: 'left',margin: [20, 0, 40, 0]},
                {text: 'TIN:\n', bold: true, fontSize: 8, alignment: 'left',margin: [20, 0, 40, 0]},
                {text: 'Term:\n', bold: true, fontSize: 8, alignment: 'left',margin: [20, 0, 40, 0]},
                {text: 'Remarks:\n', bold: true, fontSize: 8, alignment: 'left',margin: [20, 0, 40, 0]},
              ]
            },
            {
              // text: 'No: \nBranch: \nDate \nDate Needed: \nManual No: \nDocument Ref: \n\nSales:'
              text: [
								{text: 'No:\n', bold: true, fontSize: 8 },
								{text: 'Branch:\n', bold: true, fontSize: 8},
                {text: 'Date:\n', bold: true, fontSize: 8},
                {text: 'Date Needed:\n', bold: true, fontSize: 8},
                {text: 'Manual No:\n', bold: true, fontSize: 8},
                {text: 'Document Ref:\n', bold: true, fontSize: 8},
                {text: 'Sales:\n', bold: true, fontSize: 8},
              ]
            }
          ]
        },
      ]
    }

     this.pdfObj = pdfMake.createPdf(docDef);
    //  console.log(this.pdfObj);
    // let iWriteOptions: IWriteOptions = { 
    //   replace: true 
    // };
    // const directory = this.file.dataDirectory;
    // const pdfFile = "easyfis-mobile.pdf";
    // this.file.checkFile(directory, pdfFile)
    // .then((res)=> {
    //   this.file.writeFile(directory, pdfFile, binaryArray, iWriteOptions)
    //   .then((res)=> {

    //     console.log("File generated" + JSON.stringify(res));

    //     this.fileOpener.open(this.file.dataDirectory + pdfFile, 'application/pdf')
    //       .then(() => console.log('File is exported'))
    //       .catch(e => console.log(e));
    //   })
    //   .catch((error)=> {
    //     console.log(JSON.stringify(error));
    //   });
    // })
    // .catch((error)=> {
    //   this.file.writeFile(directory, pdfFile, binaryArray)
    //   .then((res)=> {
        
    //     console.log("File created" + JSON.stringify(res));
        
    //     this.fileOpener.open(this.file.dataDirectory + pdfFile, 'application/pdf')
    //       .then(() => console.log('File exported'))
    //       .catch(e => console.log(e));
    //   })
    //   .catch((error)=> {
    //     console.log(JSON.stringify(error));
    //   });
    // });

    // if(this.plt.is("android")){

    //  this.pdfObj.getBase64(async (data) =>{
    //  this.file.checkFile(storage,pdfFile).then((res) =>{
    // //  Filesystem.writeFile({
    // //     path: pdfFile,
    // //     data: data,
    // //     directory: Directory.Documents,
    // //     recursive: true
    // //   });
    //   // this.file.writeFile(storage, pdfFile, binaryArray, iWriteOptions)
    //   //       .then((res)=> {
    //            console.log("File generated" + JSON.stringify(res));
    //             // this.fileOpener.open(storage + pdfFile, 'application/pdf');
    //            console.log("File generated" + JSON.stringify(res));
      
    //   //   this.fileOpener.open(this.file.dataDirectory + pdfFile, 'application/pdf')
    //   // // })
    //   //       .catch((error)=> {
    //   //         console.log(JSON.stringify(error));
    //   //       });
    //     });
    //       // .catch((error)=> {
    //       //   this.file.writeFile(storage, pdfFile, binaryArray)
    //       //   .then((res)=> {
              
    //       //     console.log("File created" + JSON.stringify(res));
              
    //       //     this.fileOpener.open(this.file.dataDirectory + pdfFile, 'application/pdf')
    //       //       .then(() => console.log('File exported'))
    //       //       .catch(e => console.log(e));
    //       //   })
    //       //   .catch((error)=> {
    //       //     console.log(JSON.stringify(error));
    //       //   });
    //       // });

    //     });
    // }else{
    //   this.pdfObj.download('demo.pdf');
    // }
  }
 generatePdf() {

    var jsPdfDoc = new JSPDF("p","mm","a4");
 
    
    let docRes = jsPdfDoc.output();
    let arrayBuffer = new ArrayBuffer(docRes.length);
    let uintArray = new Uint8Array(arrayBuffer);

    for (var i = 0; i < docRes.length; i++) {
      uintArray[i] = docRes.charCodeAt(i);
    }


    const directory = this.file.dataDirectory;
    const pdfFile = "demo.pdf";

    let iWriteOptions: IWriteOptions = { 
      replace: true 
    };

    this.file.checkFile(directory, pdfFile)
    .then((res)=> {
      this.file.writeFile(directory, pdfFile, arrayBuffer, iWriteOptions)
      .then((res)=> {

        console.log("File generated" + JSON.stringify(res));

        this.fileOpener.open(this.file.dataDirectory + pdfFile, 'application/pdf')
          .then(() => console.log('File is exported'))
          .catch(e => console.log(e));
      })
      .catch((error)=> {
        console.log(JSON.stringify(error));
      });
    })
    .catch((error)=> {
      this.file.writeFile(directory, pdfFile, arrayBuffer)
      .then((res)=> {
        
        console.log("File created" + JSON.stringify(res));
        
        this.fileOpener.open(this.file.dataDirectory + pdfFile, 'application/pdf')
          .then(() => console.log('File exported'))
          .catch(e => console.log(e));
      })
      .catch((error)=> {
        console.log(JSON.stringify(error));
      });
    });
}


    //  if(this.plt.is("android")){
    //   this.pdfObj.getBase64(async (data) =>{
    //     try{
          
    //       let path = 'www/assets';
          
    //       const result = await Filesystem.writeFile({
    //         path,
    //         data: data,
    //         directory: Directory.Documents,
    //         recursive: true
    //       });
          
    //       this.fileOpener.open('${result.url}', 'application/pdf');
    //       console.log(result);
    //       console.log("result");
    //     }catch(e){
    //       console.log("Unable to write")
    //     }
    //   });
    // }else{
    //   this.pdfObj.download('demo.pdf');
    // }
  // }
  // downloadPdf(){
    

    // const fileTransfer: FileTransferObject = this.ft.create();
    // const url = 'http://www.africau.edu/images/default/sample.pdf';
    // fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
    //   console.log('download complete: ' + entry.toURL());
    // }, (error) => {
    //   // handle error
    //   console.log('error');
    // });
  // }
  // pdfup(){
  //   const image = this.base64Image ? {image: this.logoData, width: 300} : {};
  //   let logo= {};
  //   const docDefinition = {
  //     watermark: {text: 'Kenrick', color: 'black'},
  //     content: [
  //       logo,
  //       {
  //         text: ''
  //       } 
  //     ]
  //   }
  //   this.pdfObj = pdfMake.createPdf(docDefinition);
  // }
  // downloadPDF(){
  
  //    let downloadURL = 'http://www.africau.edu/images/default/sample.pdf';
  //   //   const url = 'http://www.africau.edu/images/default/sample.pdf';
  //   //   transfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
  //   //     console.log('download complete: ' + entry.toURL());
        
  //   //   }, (error) => {
  //   //     // handle error
  //   //   });
  //   let path = this.file.dataDirectory;
  //   const transfer = this.ft.create();

  //   transfer.download(downloadURL, '${path}demo.pdf').then(entry => {
  //     let pdf = entry.toUrl();
  //     if(this.plt.is('capacitor')){
        
  //       this.document.viewDocument(pdf, 'application/pdf', {});
  //     }else{
  //       this.fileOpener.open(pdf, 'application/pdf');
  //     }
  //   });
  // }
 
  // download() {
  //   const fileTransfer: FileTransferObject = this.ft.create();
  //   const url = 'http://www.africau.edu/images/default/sample.pdf';
  //   fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
  //     console.log('download complete: ' + entry.toURL());
  //   }, (error) => {
  //     // handle error 
  //     console.log('error');
  //   });
  // }
  // loadLocalAssetToBase64(){
  //   this.http.get('./assets/logos/easyfis-logo.png', {responseType: 'blob'}).subscribe(res => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       this.logoData = reader.result
  //     }
  //     reader.readAsDataURL(res); 
  //   })
  // }

  // async takePicture(){
  //   const image = await Camera.getPhoto({
  //     quality: 100,
  //     allowEditing: false,
  //     resultType:  CameraResultType.Base64,
  //     source: CameraSource.Camera
  //   })
  //     console.log('image');
  //     this.base64Image = image.base64String;
  //     this.photoPreview = 'data:image/jpeg;base64,${this.base64Image}';
  // }
  // openPDF(){
  //     this.iab.create('http://www.africau.edu/images/default/sample.pdf', '_blank');
  // }
  //http://www.africau.edu/images/default/sample.pdf
     
  //This will list all of your bluetooth devices
  // listPrinter() { 
  //   this.print.searchBluetoothPrinter()
  //     .then(resp=>{
     
  //         //List of bluetooth device list
  //     this.bluetoothList=resp;
  //     console.log(resp);
  //     console.log("Hello");
  //     });
  // }
  // //This will store selected bluetooth device mac address
  // selectPrinter(macAddress){
  // //Selected printer macAddress stored here
  //   this.selectedPrinter=macAddress;
  // }

  // //This will print
  // printStuff(){  
  //  //The text that you want to print
  //  var myText="Hello hello hello \n\n\n This is a test \n\n\n";
  //  this.print.sendToBluetoothPrinter(this.selectedPrinter,myText);
  // }

  ngDestroy(): void {
    this.sub.unsubscribe();
  }
  
}