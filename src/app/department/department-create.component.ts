import {Component} from '@angular/core';
import {Location} from '@angular/common';

import {Department} from './department';
import {DepartmentService} from './department.service';

@Component({
    selector: 'department-create-component',
    templateUrl: './department-create.component.html'
})
export class DepartmentCreateComponent {
    model = new Department();

    constructor(
        private location: Location,
        private service: DepartmentService
    ) { }

    onSubmit() {
        this.service
            .create(this.model)
            .then(() => this.goBack());
    }

    reset() {
        this.model = new Department();
    }

    goBack(): void {
        this.location.back();
    }
}
