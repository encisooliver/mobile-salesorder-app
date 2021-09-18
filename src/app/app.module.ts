import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRouterActivate } from './app-router.activate';
import { SysStorageService } from './services/sys-storage/sys-storage.service';
import { ToastService } from './shared/toast/toast.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial/ngx';
import { Printer } from '@ionic-native/printer/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    AppRouterActivate, SysStorageService, ToastService,FileOpener,File,FileTransfer,DocumentViewer,InAppBrowser,BluetoothSerial,Printer],
  bootstrap: [AppComponent],
})
export class AppModule { }
