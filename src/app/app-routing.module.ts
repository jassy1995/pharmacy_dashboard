import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ApprovedComponent } from './components/approved/approved.component';
import { PendingApprovalsComponent } from './components/pending-approvals/pending-approvals.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: ':slug/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':slug/approved',
    component: ApprovedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':slug/pending',
    component: PendingApprovalsComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
