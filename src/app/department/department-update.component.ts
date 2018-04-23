import {Component, OnInit, Input} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {Department} from './department';
import {DepartmentService} from './department.service';


/**
 * Angular component for the Department entity.
 *
 * @author Devin Spivey
 * @since 6/29/2017
 */
@Component({
    selector: 'department-detail-component',
    templateUrl: './department-update.component.html'
})

export class DepartmentUpdateComponent implements OnInit {
    @Input() model: Department;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private service: DepartmentService
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.service.findOne(+params['id']))
            .subscribe(Department => this.model = Department);
    }

    onSubmit() {
        this.service
            .update(this.model)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}
