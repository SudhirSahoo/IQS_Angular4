import {Component, OnInit, ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";


import {NgModel, FormGroup} from "@angular/forms";



/**
 * description goes here...
 *
 * @author vfc91343
 * @since 3/30/2018
 */
@Component({
    selector: 'iqsalertfilter-component',
    templateUrl: './iqsalertfilter.component.html',
    styleUrls: ['./iqsalertfilter.component.css'],
})

export class IQSAlertFilterComponent implements OnInit {

    constructor(private http: Http,
                private router: Router) {
    }

    ngOnInit(): void {
        // initialize services and data
              
    }
}
