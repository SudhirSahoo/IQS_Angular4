import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {AlertService} from '../alert/alert.service';

@Injectable()
export class InspectionService {

  private headers = new Headers({'Content-Type': 'application/json'});
  public count: Subject<number> = new Subject<number>();
  public providers: [AlertService];

  constructor(private http: Http, private AlertService: AlertService) {
  }

}
