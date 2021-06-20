import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BhargavaSiddantamFormComponent } from './components/bhargava-siddantam-form/bhargava-siddantam-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'bhargava-siddantam-form',
    component: BhargavaSiddantamFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
