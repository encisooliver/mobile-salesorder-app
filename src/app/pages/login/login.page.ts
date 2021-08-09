import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SysLoginModel } from 'src/app/models/sys-login-model';
import { SysLoginService } from './../../services/sys-login/sys-login.service';
import { Storage } from '@ionic/storage-angular';
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
}
