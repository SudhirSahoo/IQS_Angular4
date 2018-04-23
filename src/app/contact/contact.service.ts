import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {AlertService} from '../alert/alert.service';
import {Contact} from './contact';

@Injectable()
export class ContactService {

  private serviceUrl = 'api/contact';
  private headers = new Headers({'Content-Type': 'application/json'});
  public count: Subject<number> = new Subject<number>();
  public providers: [AlertService];

  constructor(private http: Http, private AlertService: AlertService) {
  }

  findOne(id: number): Promise<Contact> {
      const url = `${this.serviceUrl}/${id}`;

      return this.http.get(url)
          .toPromise()
          .then(response => response.json() as Contact)
          .catch(error => this.handleError(error, this.AlertService));
  }

  findAll(): Observable<Contact[]> {
      return this.http.get(this.serviceUrl)
          .map(response => {
              const array = response.json() as Contact[];
              this.count.next(array.length);

              return array;
          })
          .catch(error => this.handleError(error, this.AlertService));
  }

  search(TypedTerm: string): Observable<Contact[]> {
      return this.http
          .get(this.serviceUrl + `?name=${TypedTerm}`)
          .map(response => {
              const array = response.json() as Contact[];
              this.count.next(array.length);

              return array;
          })
          .catch(error => this.handleError(error, this.AlertService));
  }

  create(contact: Contact): Promise<Contact> {
      return this.http
          .post(this.serviceUrl, JSON.stringify(Contact), {headers: this.headers})
          .toPromise()
          .then(response => {
              this.AlertService.success(`Successfully created contact "${contact.ContactName}"!`, true);
              return response.json() as Contact;
          })
          .catch(error => this.handleError(error, this.AlertService));
  }

  update(contact: Contact): Promise<Contact> {
      const url = `${this.serviceUrl}`;

      return this.http
          .put(url, JSON.stringify(contact), {headers: this.headers})
          .toPromise()
          .then(() => {
              this.AlertService.success(`Successfully updated contact "${contact.ContactName}"!`, true);
              return Contact;
          })
          .catch(error => this.handleError(error, this.AlertService));
  }

  delete(contact: Contact): Promise<void> {
      const url = `${this.serviceUrl}/${contact.ContactID}`;

      return this.http.delete(url, {headers: this.headers})
          .toPromise()
          .then(() => {
              this.AlertService.success(`Successfully deleted contact "${contact.ContactName}"!`);
              return null;
          })
          .catch(error => this.handleError(error, this.AlertService));
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
