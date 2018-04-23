import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Http} from "@angular/http";
import 'rxjs/add/operator/switchMap';

import {Inspection} from './inspection';
import {InspectionService} from './inspection.service';


/**
 * Angular component for Inspection.
 *
 * @author vfc91343
 * @since 4/20/2018
 */
@Component({
  selector: 'app-inspection',
  templateUrl: '../inspection/inspection.component.html',
  styleUrls: ['../inspection/inspection.component.css']
})
export class InspectionComponent implements OnInit {
    private inspectionList: Inspection[];
    
    constructor(private http: Http,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.http
            .get('api/inspection/1')
            .toPromise()
            .then(response => {
               let data = response.json();
               if (data.inspectionList) this.inspectionList = data.inspectionList;
            })
            .catch(error => {
                //alert("Error...");
             //   this.alertService.error(error);
            });
    }

    create(): void {
      this.router.navigate(['/inspection/create']);
    }
    
    update(inspection: Inspection): void {
      this.router.navigate(['/inspection/create', inspection.id]);
    }

}
