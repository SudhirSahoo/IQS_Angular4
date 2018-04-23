import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

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
  selector: 'app-inspection-create',
  templateUrl: '../inspection/inspection-create.component.html',
  styleUrls: ['../inspection/inspection-create.component.css']
})
export class InspectionCreateComponent implements OnInit {

    constructor(
        private router: Router,
        private location: Location
    ) {}

    ngOnInit(): void {
        
    }

    
}
