import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {AlertService} from '../alert/alert.service';
import {Department} from './department';

/**
 * Service that will handle interactions with the backend API service
 * for Department entities.
 *
 * @author Devin Spivey
 * @since 6/28/2017
 */
@Injectable()
export class DepartmentService {
    private serviceUrl = 'api/department';
    private headers = new Headers({'Content-Type': 'application/json'});
    public count: Subject<number> = new Subject<number>();

    constructor(
        private http: Http,
        private alertService: AlertService
    ) {}

    findOne(id: number): Promise<Department> {
        const url = `${this.serviceUrl}/${id}`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Department)
            .catch(error => this.handleError(error, this.alertService));
    }

    findAll(): Observable<Department[]> {
        return this.http
            .get(this.serviceUrl)
            .map(response => {
                const array = response.json() as Department[];
                this.count.next(array.length);

                return array;
            })
            .catch(error => this.handleError(error, this.alertService));
    }

    search(term: string): Observable<Department[]> {
        return this.http
            .get(this.serviceUrl + `?name=${term}`)
            .map(response => {
                const array = response.json() as Department[];
                this.count.next(array.length);

                return array;
            })
            .catch(error => this.handleError(error, this.alertService));
    }

    create(department: Department): Promise<Department> {
        return this.http
            .post(this.serviceUrl, JSON.stringify(department), {headers: this.headers})
            .toPromise()
            .then(response => {
                this.alertService.success(`Successfully created department "${department.Department_name}"!`, true);
                return response.json() as Department;
            })
            .catch(error => this.handleError(error, this.alertService));
    }

    update(department: Department): Promise<Department> {
        const url = `${this.serviceUrl}`;

        return this.http
            .put(url, JSON.stringify(department), {headers: this.headers})
            .toPromise()
            .then(() => {
                this.alertService.success(`Successfully updated department "${department.Department_name}"!`, true);
                return department;
            })
            .catch(error => this.handleError(error, this.alertService));
    }

    delete(department: Department): Promise<void> {
        const url = `${this.serviceUrl}/${department.departmentId}`;

        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => {
                this.alertService.success(`Successfully deleted department "${department.Department_name}"!`, true);
                return null;
            })
            .catch(error => this.handleError(error, this.alertService));
    }

    private handleError(error: any, alertService: AlertService): Promise<any> {
        if (error._body) {
            const errorBody = JSON.parse(error._body);

            alertService.error(errorBody.message);
        } else {
            alertService.error(error);
        }

        return Promise.reject(error.message || error);
    }
}
