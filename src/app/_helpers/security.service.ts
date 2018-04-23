import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {AlertService} from '../alert/alert.service';
import {Contact} from '../contact/contact';

/**
 * Service that will handle security interactions such as returning the
 * logged in Associate, logging out, etc.
 *
 * @author vfc90315
 * @since 7/14/2017
 */
@Injectable()
export class SecurityService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http,
                private alertService: AlertService) {
    }

    currentUser(): Promise<Contact> {
        return this.http
            .get('/api/security/principal')
            .toPromise()
            .then(response => response.json() as Contact)
            .catch(this.handleError);
    }

    logout(): void {
        this.http
            .post('/logout', null)
            .map(() => window.location.href = '/login')
            .subscribe();
    }

    private handleError(error: any): Promise<any> {
        this.alertService.error(error);
        return Promise.reject(error.message || error);
    }
}
