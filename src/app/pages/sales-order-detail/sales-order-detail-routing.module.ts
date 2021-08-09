import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoAttachmentComponent } from './components/so-attachment/so-attachment.component';
import { SoDetailsComponent } from './components/so-details/so-details.component';
import { SoItemsComponent } from './components/so-items/so-items.component';

import { SalesOrderDetailPage } from './sales-order-detail.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'so',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SalesOrderDetailPage,
    children: [
      {
        path: 'so',
        component: SoDetailsComponent
      },
      {
        path: 'so-items',
        component: SoItemsComponent
      },
      {
        path: 'so-attachment',
        component: SoDetailsComponent
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesOrderDetailPageRoutingModule {}
