import {Injectable}     from '@angular/core';
import {Headers, Http}  from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {AlertService} from '../alert/alert.service';
import {Associate} from './associate';

/**
 * Service that will handle interactions with the backend API service
 * for Associate entities.
 *
 * @author vfc91343
 * @since 4/4/2018
 */
@Injectable()
export class AssociateService {
    private serviceUrl = 'api/associate';
    private headers = new Headers({'Content-Type': 'application/json'});
    public count: Subject<number> = new Subject<number>();

    constructor(private http: Http, private alertService: AlertService) {
    }

    findAll(): Observable<Associate[]> {
        return this.http.get(this.serviceUrl)
            .map(response => {
                const array = response.json() as Associate[];
                this.count.next(array.length);

                return array;
            })
            .catch(error => this.handleError(error, this.alertService));
    }

    search(term: string): Observable<Associate[]> {
        return this.http
            .get(this.serviceUrl + `?name=${term}`)
            .map(response => {
                const array = response.json() as Associate[];
                this.count.next(array.length);

                return array;
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
