import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesOrderListPage } from './sales-order-list.page';

const routes: Routes = [
  {
    path: '',
    component: SalesOrderListPage
  },
  {
    path: 'delete-modal',
    loadChildren: () => import('./delete-modal/delete-modal.module').then( m => m.DeleteModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesOrderListPageRoutingModule {}
