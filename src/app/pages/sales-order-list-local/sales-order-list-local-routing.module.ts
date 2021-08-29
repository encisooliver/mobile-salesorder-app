import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesOrderListLocalPage } from './sales-order-list-local.page';

const routes: Routes = [
  {
    path: '',
    component: SalesOrderListLocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesOrderListLocalPageRoutingModule {}
