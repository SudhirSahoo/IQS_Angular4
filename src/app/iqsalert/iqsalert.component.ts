import {Component, OnInit, ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";

import {NgModel, FormGroup} from "@angular/forms";

import {Priority} from "./priority";

/**
 * description goes here...
 *
 * @author vfc91343
 * @since 3/30/2018
 */
@Component({
    selector: 'iqsalert-component',
    templateUrl: './iqsalert.component.html',
    styleUrls: ['./iqsalert.component.css'],
})

export class IQSAlertComponent implements OnInit {
    noOfPriorities : number;
    private priorityList: Priority[];
    
    private priorityModel = new Priority();
    
    constructor(private http: Http,
                private router: Router) {
    }

    ngOnInit(): void {
        // initialize services and data
        this.http
            .get('api/iqsalert')
            .toPromise()
            .then(response => {
               let data = response.json();
                this.noOfPriorities = data.noOfPriorities;
                if (data.priorityList) this.priorityList = data.priorityList;
                
            })
            .catch(error => {
                //alert("Error...");
             //   this.alertService.error(error);
            });
       
    }
}
