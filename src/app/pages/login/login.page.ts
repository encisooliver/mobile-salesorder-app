import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SysLoginModel } from 'src/app/models/sys-login-model';
import { SysLoginService } from './../../services/sys-login/sys-login.service';
import { Storage } from '@ionic/storage-angular';
import { SysStorageService } from 'src/app/services/sys-storage/sys-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private sysLoginService: SysLoginService,
    private storage: Storage,
    private sysStorageService: SysStorageService,
  ) { }
  sysLoginModel: SysLoginModel = {
    Username: '',
    Password: ''
  };

  ngOnInit() {
    this.storage.get("access_token").then(
      result => {
        let token = result
        if (token) {
          this.router.navigate(['/dashboard'])
        }
      }
    )
  }

  login(): void {
    // this.disabled = true;
    this.sysLoginService.login(this.sysLoginModel).subscribe(
      data => {

        if (data[0] == true) {
          setTimeout(() => {
            this.router.navigate(['/dashboard'])
          }, 500);
        } else {
          // this.toastr.error(data[1], 'Login');
          // this.disabled = false;
        }

      }
    );
  }

  async asyncLogin() {
    // this.disabled = true;
    (await this.sysLoginService.asyncLogin(this.sysLoginModel)).subscribe(
      data => {
        console.log(data);
        let results = data;
        this.sysStorageService.set('access_token', results["AccessToken"]);
        this.sysStorageService.set('expires_in', results["ExpiresIn"]);
        this.sysStorageService.set('username', results["UserName"]);
        this.sysStorageService.set('fullname', results["FullName"]);
        this.sysStorageService.set('companyId', results["CompanyId"]);
        this.sysStorageService.set('company', results["Company"]);
        this.sysStorageService.set('branchId', results["BranchId"]);
        this.sysStorageService.set('branch', results["Branch"]);
        this.router.navigate(['/dashboard']);
      }
    );
  }
}
