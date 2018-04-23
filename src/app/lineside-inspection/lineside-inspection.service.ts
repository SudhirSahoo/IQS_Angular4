import {Headers, Http}  from "@angular/http";
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs";
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable}     from "@angular/core";
import {Component, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {AlertService} from "../alert/alert.service";
import {LineSideInspection}   from './lineside-inspection';

@Injectable()
export class LineSideInspectionService {

  private inspectionUrl = '/api/inspection';
  private headers = new Headers({'Content-Type':'application/json'});
  private inspectionList: LineSideInspection[];
  
  constructor(private http: Http,
                private router: Router,
                private alertService: AlertService) {
  }

  getInspections(): Observable<LineSideInspection[]> {
     return this.http.get(this.inspectionUrl)
            .map(response => {
                let data = response.json();
                let inspectionList = data.inspectionList
                return inspectionList;
            })
            .catch(error => {
                alert("error");
                return "";
            });
  }
   

  update(inspection: LineSideInspection): Promise<LineSideInspection> {
        const url = '/api/inspection/updatecount/';
        let rankName = inspection.rankName;
        return this.http
            .post(url, JSON.stringify(inspection), {headers: this.headers})
            .toPromise()
            .then(response => {
                let data = response.json();
                if (rankName='A') inspection.rankAcount = data.rankAcount;
                if (rankName='B') inspection.rankBcount = data.rankBcount;
                if (rankName='C') inspection.rankCcount = data.rankCcount;
                return response.json() as LineSideInspection;
            })
            .catch(error => {
                alert("error");
            });
    }

    
    /* update(inspection: Inspection): Promise<Inspection> {
         return new Promise((resolve, reject) => {
            const url = '/api/inspection/updatecount/';
            let rankName = inspection.rankName;
            
             this.http
            .post(url, JSON.stringify(inspection), {headers: this.headers})
            .toPromise()
            .then(response => {
                //this.alertService.success('Successfully created associate "${associate.name}"!', true);
                let data = response.json();
                if (rankName='A') inspection.rankAcount = data.rankAcount;
                if (rankName='B') inspection.rankBcount = data.rankBcount;
                if (rankName='C') inspection.rankCcount = data.rankCcount;
                return response.json() as Inspection;
            })
            .catch(error => {
            });
             
            resolve();
        });
    }
    */


    
    sendMesage(inspection: LineSideInspection) {
        var that = this;
         that.alertService.confirm("Threshold reached for Rank " + inspection.rankName + ". Do you want to send message ?",function(){
            const url = '/api/inspection/sendmessage/';
             that.http
                .post(url, JSON.stringify(inspection), {headers: that.headers})
                .toPromise()
                .then(response => {
                    let data = response.json();
                    return response.json() as LineSideInspection;
            })
            .catch(error => {
                alert("error");
            });
        },function(){
          //alert("No clicked"); 
        })
    }

    /*
    sendMesage(inspection: Inspection) {
         this.alertService.confirm("Threshold reached for Rank " + inspection.rankName + ". Do you want to send message ?",function(){
            alert("1...");
            const url = '/api/inspection/sendmessage/';
             this.http
                .post(url, JSON.stringify(inspection), {headers: this.headers})
                .toPromise()
                .then(response => {
                    let data = response.json();
                    return response.json() as Inspection;
            })
            .catch(error => {
                alert("error");
            });
        },function(){
          alert("No clicked"); 
        })
    }
    */

}
