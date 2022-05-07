import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmPage } from './alarm-page.component';

const routes: Routes = [
  {
    path: '',
    component: AlarmPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlarmPageRoutingModule {}
