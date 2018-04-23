import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty'

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {Department} from './department';
import {DepartmentService} from './department.service';

/**
 * Angular component for the Department entity.
 *
 * @author Devin Spivey
 * @since 6/28/2017
 */
@Component({
    selector: 'department-component',
    templateUrl: './department.component.html',
    providers: [DepartmentService]
})
export class DepartmentComponent implements OnInit {
    private departmentsObservable: Observable<Department[]>;
    private Department: Department[];
    private searchTerms = new Subject<string>();
    private showTable = false;

    constructor(private router: Router,
                private departmentService: DepartmentService) {
    }

    ngOnInit(): void {
        this.departmentsObservable = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                ? this.departmentService.search(term)
                : this.departmentService.findAll())
            .catch(error => {
                console.log(error);
                return Observable.of<Department[]>([]);
            });

        // subscribe to the count observable so that we update whether we need to show the table or the empty block
        this.departmentService.count.subscribe(count => this.showTable = (count > 0));

        // subscribe to the Department observable
        // save the emitted values in the Department array
        this.departmentsObservable.subscribe(Department => this.Department = Department);

        // initialize the first search with an empty term so that we return all Department
        this.searchTerms.next();
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    resetSearch(searchBox): void {
        // feed in a blank search so we get all items back
        this.searchTerms.next();

        // reset text in the search box
        searchBox.value = '';
    }

    update(department: Department): void {
        this.router.navigate(['/department/update', department.departmentId]);
    }

    create(): void {
        this.router.navigate(['/department/create']);
    }

    delete(department: Department): void {
        if (confirm(`Are you sure you want to delete the "${department.Department_name}" department?`)) {
            this.departmentService
                .delete(department)
                .then(() => {
                    this.Department = this.Department.filter(d => d !== department);

                    // update count so we display the correct template if the array is now empty
                    this.departmentService.count.next(this.Department.length);
                })
                .catch(error => {
                    alert(`Could not delete "${department.Department_name}" department!`);
                    console.log(error);
                });
        }
    }
}
