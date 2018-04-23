import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AlertService} from './alert/alert.service';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';

import {IqsInterceptor} from './IqsInterceptor';
import {AppRoutingModule } from './app-routing.module';
import {DashboardService} from './dashboard/dashboard.service';
import {LineSideInspectionService} from './lineside-inspection/lineside-inspection.service';
import {ContactService} from './contact/contact.service';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LinesideMonitorComponent} from './lineside-monitor/lineside-monitor.component';
import {LineSideInspectionComponent} from './lineside-inspection/lineside-inspection.component';
import {ContactComponent} from './contact/contact.component';
import {ContactCreateComponent} from './contact/contact-create.component';
import {AlertComponent} from './alert/alert.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentCreateComponent } from './department/department-create.component';
import { DepartmentService } from './department/department.service';
import { DepartmentUpdateComponent } from './department/department-update.component';
import { NotificationlevelComponent } from './notificationlevel/notificationlevel.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { UploadFileService } from './form-upload/form-upload.service';
import {InspectionComponent} from './inspection/inspection.component';
import {InspectionCreateComponent} from './inspection/inspection-create.component';


@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        AlertService,
        DashboardService,
        LineSideInspectionService,
        ContactService,
        ContactCreateComponent,
        DepartmentService,
        DepartmentCreateComponent,
        UploadFileService,
        { provide: HTTP_INTERCEPTORS, useClass: IqsInterceptor, multi: true }
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        NavigationComponent,
        DashboardComponent,
        LinesideMonitorComponent,
        LineSideInspectionComponent,
        ContactComponent,
        ContactCreateComponent,
        DepartmentComponent,
        DepartmentCreateComponent,
        NotificationlevelComponent,
        FormUploadComponent,
        InspectionComponent,
        InspectionCreateComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
