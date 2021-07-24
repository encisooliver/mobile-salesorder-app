import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class DashboardRouterActivate implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate() {
        if (localStorage.getItem("access_token") != null) {
            this.router.navigate(["/dashboard"]);
            return true;
        } else {
            return false;
        }
    }
}