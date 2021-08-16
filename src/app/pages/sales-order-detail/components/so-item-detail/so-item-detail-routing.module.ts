import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoItemDetailPage } from './so-item-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SoItemDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoItemDetailPageRoutingModule {}
