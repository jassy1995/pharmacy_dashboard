import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth.guard';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { BottomNavComponent } from './components/shared/bottom-nav/bottom-nav.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { TimeAgoPipe } from './pipes/timeago.pipe';
import { SquareBoxComponent } from './components/square-box/square-box.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApprovedComponent } from './components/approved/approved.component';
import { PendingApprovalsComponent } from './components/pending-approvals/pending-approvals.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DefaultLayoutComponent,
    HeaderComponent,
    FooterComponent,
    BottomNavComponent,
    DialogComponent,
    TimeAgoPipe,
    SquareBoxComponent,
    CapitalizePipe,
    ApprovedComponent,
    HeaderComponent,
    DashboardComponent,
    PendingApprovalsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
