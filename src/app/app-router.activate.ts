import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class AppRouterActivate implements CanActivate {
    token = null;
    constructor(
        private router: Router,
        private storage: Storage,
    ) {
        this.storage.get("access_token").then(
            result => {
                this.token = result;
            }
        )
    }

    canActivate() {
        if (this.token != null) {
            this.router.navigate(["/dashboard"]);
            return true;
        } else {
            return false;
        }
    }
}