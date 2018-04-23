import {Component, OnInit, ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";

import {NgModel, FormGroup} from "@angular/forms";

@Component({
  selector: 'iqs-priority-component',
  templateUrl: './iqs-priority.component.html',
  styleUrls: ['./iqs-priority.component.css']
})
export class IqsPriorityComponent implements OnInit {

    constructor(private http: Http,
                private router: Router) {
    }

  ngOnInit() {
  }

}
