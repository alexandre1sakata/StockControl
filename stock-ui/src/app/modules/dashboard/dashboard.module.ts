import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { RouterModule } from '@angular/router';

import { DASHBOARD_ROUTES } from './dashboard.routing';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SidebarModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ToastModule, 
    ChartModule,

    RouterModule.forChild(DASHBOARD_ROUTES)
  ],
  providers: [
    MessageService, 
    CookieService
  ]
})
export class DashboardModule { }
