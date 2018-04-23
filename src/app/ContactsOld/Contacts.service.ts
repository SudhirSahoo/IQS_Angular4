import {Injectable}     from "@angular/core";
import {Headers, Http}  from "@angular/http";

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {AlertService} from "../alert/alert.service";
import {Contacts} from "./Contacts";

/**
 * Service that will handle interactions with the backend API service
 * for Contacts entities.
 *
 * @author Devin Spivey / modified by Keith Barno
 * @since 7/4/2017
 */
@Injectable()
export class ContactsService {
    private serviceUrl = 'api/Contacts';
    private headers = new Headers({'Content-Type': 'application/json'});
    public count: Subject<number> = new Subject<number>();

    constructor(private http: Http, private alertService: AlertService) {
    }

    findOne(id: number): Promise<Contacts> {
        const url = `${this.serviceUrl}/${id}`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Contacts)
            .catch(error => this.handleError(error, this.alertService));
    }

    findAll(): Observable<Contacts[]> {
        return this.http.get(this.serviceUrl)
            .map(response => {
                const array = response.json() as Contacts[];
                this.count.next(array.length);

                return array;
            })
            .catch(error => this.handleError(error, this.alertService));
    }

    search(term: string): Observable<Contacts[]> {
        return this.http
            .get(this.serviceUrl + `?name=${term}`)
            .map(response => {
                const array = response.json() as Contacts[];
                this.count.next(array.length);

                return array;
            })
            .catch(error => this.handleError(error, this.alertService));
    }

    create(Contacts: Contacts): Promise<Contacts> {
        return this.http
            .post(this.serviceUrl, JSON.stringify(Contacts), {headers: this.headers})
            .toPromise()
            .then(response => {
                this.alertService.success(`Successfully created Contacts "${Contacts.Contact_Name}"!`, true);
                return response.json() as Contacts;
            })
            .catch(error => this.handleError(error, this.alertService));
    }

    update(Contacts: Contacts): Promise<Contacts> {
        const url = `${this.serviceUrl}`;

        return this.http
            .put(url, JSON.stringify(Contacts), {headers: this.headers})
            .toPromise()
            .then(() => {
                this.alertService.success(`Successfully updated Contacts "${Contacts.Contact_Name}"!`, true);
                return Contacts;
            })
            .catch(error => this.handleError(error, this.alertService));
    }

    delete(Contacts: Contacts): Promise<void> {
        const url = `${this.serviceUrl}/${Contacts.ContactsId}`;

        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => {
                this.alertService.success(`Successfully deleted Contacts "${Contacts.Contact_Name}"!`);
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
