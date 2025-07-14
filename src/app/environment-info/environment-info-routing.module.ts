import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvironmentInfoPage } from './environment-info.page';

const routes: Routes = [
  {
    path: '',
    component: EnvironmentInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvironmentInfoPageRoutingModule {}
