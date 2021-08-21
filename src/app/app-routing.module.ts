import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BhargavaSiddantamDayComponent } from './components/bhargava-siddantam-day/bhargava-siddantam-day.component';
import { ReturnCalcComponent } from './components/return-calc/return-calc.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'bhargava-siddantam-details',
    component: BhargavaSiddantamDayComponent,
    pathMatch: 'full'
  },
  {
    path: 'returns-calc',
    component: ReturnCalcComponent,
    canActivate: [MsalGuard]
  },
  {
    path: '**',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
