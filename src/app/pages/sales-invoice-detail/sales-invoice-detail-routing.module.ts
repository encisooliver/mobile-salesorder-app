import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesInvoiceDetailPage } from './sales-invoice-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SalesInvoiceDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesInvoiceDetailPageRoutingModule {}
