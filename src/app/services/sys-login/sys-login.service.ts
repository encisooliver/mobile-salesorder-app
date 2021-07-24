import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';
import { Observable } from "rxjs";
import { AppSettings } from './../../settings/app-settings';
import { SysLoginModel } from './../../models/sys-login-model';

@Injectable({
  providedIn: 'root'
})
export class SysLoginService {
  private _storage: Storage | null = null;
  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient,
    private storage: Storage
  ) { 
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
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

          this._storage.set('access_token', results["AccessToken"]);
          this._storage.set('expires_in', results["ExpiresIn"]);
          this._storage.set('username', results["UserName"]);
          this._storage.set('fullname', results["FullName"]);
          this._storage.set('companyId', results["CompanyId"]);
          this._storage.set('company', results["Company"]);
          this._storage.set('branchId', results["BranchId"]);
          this._storage.set('branch', results["Branch"]);

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
}
