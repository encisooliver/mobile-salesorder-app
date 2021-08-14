import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';
import { Observable } from "rxjs";
import { AppSettings } from './../../settings/app-settings';
import { SysLoginModel } from './../../models/sys-login-model';
import { SysStorageService } from './../sys-storage/sys-storage.service';
@Injectable({
  providedIn: 'root'
})
export class SysLoginService {
  private storage: Storage | null = null;
  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient,
    private sysStorageService: SysStorageService,
  ) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    // const storage = await this.storage.create();
    // this.storage = storage;
  }

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;
  public options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public login(sysLoginModel: SysLoginModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      let url = this.defaultAPIURLHost + '/api/SysUserAuthenticationAPI/authenticate';
      let body = JSON.stringify(sysLoginModel);
      let options = this.options;

      this.httpClient.post(url, body, options).subscribe(
        response => {
          let results = response;

          this.sysStorageService.set('access_token', results["AccessToken"]);
          this.sysStorageService.set('expires_in', results["ExpiresIn"]);
          this.sysStorageService.set('username', results["UserName"]);
          this.sysStorageService.set('fullname', results["FullName"]);
          this.sysStorageService.set('companyId', results["CompanyId"]);
          this.sysStorageService.set('company', results["Company"]);
          this.sysStorageService.set('branchId', results["BranchId"]);
          this.sysStorageService.set('branch', results["Branch"]);

          observer.next([true, ""]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error]);
          observer.complete();
        }
      );
    });
  }

  public async asyncLogin(sysLoginModel: SysLoginModel) {
    let url = this.defaultAPIURLHost + '/api/SysUserAuthenticationAPI/authenticate';
    let body = JSON.stringify(sysLoginModel);
    let options = this.options;
    return await this.httpClient.post(url, body, options);
  }
}
