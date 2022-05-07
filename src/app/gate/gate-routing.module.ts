import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GatePage } from './gate-page.component';

const routes: Routes = [
  {
    path: '',
    component: GatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatePageRoutingModule {}
