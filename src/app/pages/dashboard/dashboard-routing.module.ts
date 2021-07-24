import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sales-order-list',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'sales-order-list',
        loadChildren: () => import('./../../pages/sales-order-list/sales-order-list.module').then( m => m.SalesOrderListPageModule)
      },
      {
        path: 'sales-order-detail',
        loadChildren: () => import('./../../pages/sales-order-detail/sales-order-detail.module').then( m => m.SalesOrderDetailPageModule)
      },
      {
        path: 'customer-list',
        loadChildren: () => import('./../../pages/customer-list/customer-list.module').then( m => m.CustomerListPageModule)
      },
      {
        path: 'customer-detail',
        loadChildren: () => import('./../../pages/customer-detail/customer-detail.module').then( m => m.CustomerDetailPageModule)
      },
      {
        path: 'item-list',
        loadChildren: () => import('./../../pages/item-list/item-list.module').then( m => m.ItemListPageModule)
      },
      {
        path: 'item-detail',
        loadChildren: () => import('./../../pages/item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
