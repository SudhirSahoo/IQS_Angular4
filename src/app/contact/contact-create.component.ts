import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {Contact} from './contact';
import {ContactService} from './contact.service';
import {Department} from '../department/department';
import {DepartmentService} from '../department/department.service';


/**
 * Angular component for updating existing Associate entities.
 *
 * @author Devin Spivey
 * @since 7/4/2017
 */
@Component({
  selector: 'app-contact-create',
  templateUrl: '../contact/contact-create.component.html',
  styleUrls: ['../contact/contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {
    model = new Contact();
    departments: Department[];

    constructor(
        private router: Router,
        private location: Location,
        private contactService: ContactService,
        private departmentService: DepartmentService
    ) {}

    ngOnInit(): void {
        // get a list of all departments so we can populate the dropdown list for the form
        this.departmentService
            .findAll()
            .subscribe(departments => this.departments = departments);
    }

    onSubmit() {
        this.contactService
            .create(this.model)
            .then(() => this.gotoList());
    }

    reset() {
        this.model = new Contact();
    }

    gotoList() {
        this.router.navigate(['/contact']);
    }

    goBack(): void {
        this.location.back();
    }
}
