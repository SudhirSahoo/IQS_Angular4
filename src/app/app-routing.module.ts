import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {LinesideMonitorComponent} from './lineside-monitor/lineside-monitor.component';
import {ContactComponent} from './contact/contact.component';
import {ContactCreateComponent} from './contact/contact-create.component';
import { DepartmentCreateComponent } from './department/department-create.component';
import { DepartmentComponent } from './department/department.component';
import {InspectionComponent} from './inspection/inspection.component';
import {InspectionCreateComponent} from './inspection/inspection-create.component';


const routes: Routes = [
    //{ path: 'login', component: LoginComponent },    
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'dashboard', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
    },
    {
        path: 'linesidemonitor',
        component: LinesideMonitorComponent,
        data: {title: 'Lineside Monitor'}
    },
    {
        path: 'contact',
        component: ContactComponent,
        data: {title: 'Contact'}
    },
    {
        path: 'contact/create',
        component: ContactCreateComponent,
        data: {title: 'Create-Contact'}
    },
    {
        path: 'department',
        component: DepartmentComponent,
        data: {title: 'Department'}
    },
    {
        path: 'department/create',
        component: DepartmentCreateComponent,
        data: {title: 'Create-Department'}
    },
    {
        path: 'inspection',
        component: InspectionComponent,
        data: {title: 'Create Inspection'}
    },
    {
        path: 'inspection/create',
        component: InspectionCreateComponent,
        data: {title: 'Inspection-Contact'}
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
