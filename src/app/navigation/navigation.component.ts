import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Contact} from '../contact/contact';
import {Department} from '../department/department'
import { SecurityService } from '../_helpers/security.service';
import { Notificationlevel } from '../notificationlevel/notificationlevel';


/**
 * Angular component for navigation.
 *
 * @author vfc91343
 * @since 4/4/2018
 */
@Component({
    selector: 'navigation-component',
    templateUrl: './navigation.component.html'
})

export class NavigationComponent implements OnInit {
    private contact: Contact;
    private department: Department;
    private notificationlevel: Notificationlevel

     constructor(private router: Router) {}

    ngOnInit(): void {
    //     this.securityService
    //        .currentUser()
    //        .then(contact => this.contact = contact);
    }

    gotoAssociate(): void {
        this.router.navigate(['/contact/create', this.contact.ContactID]);
    }

    gotoDepartment(): void {
        this.router.navigate(['/department/create', this.department.departmentId]);
    }

    gotoNotificationLevel(): void {
        this.router.navigate(['/notificationlevel/create', this.notificationlevel.Notification_Level]);
    }
    // logout(): void {
    //     this.securityService.logout();
    // }
}
