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
      {
        path: 'sales-order-list-local',
        loadChildren: () => import('./../../pages/sales-order-list-local/sales-order-list-local.module').then( m => m.SalesOrderListLocalPageModule)
      },
      {
        path: 'sales-invoce-list',
        loadChildren: () => import('../../pages/sales-invoce-list/sales-invoce-list.module').then( m => m.SalesInvoceListPageModule)
      },
      {
        path: 'sales-invoice-detail',
        loadChildren: () => import('../../pages/sales-invoice-detail/sales-invoice-detail.module').then( m => m.SalesInvoiceDetailPageModule)
      },
      {
        path: 'sales-invoice-list-local',
        loadChildren: () => import('../../pages/sales-invoice-list-local/sales-invoice-list-local.module').then( m => m.SalesInvoiceListLocalPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
