import {Component, OnInit, Input, ViewChild} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Router} from "@angular/router";
import {NgModel, FormGroup} from "@angular/forms";

import {LineSideInspection} from './lineside-inspection';
import {AlertService} from "../alert/alert.service";
import {LineSideInspectionService} from './lineside-inspection.service';

@Component({
  selector: 'app-lineside-inspection',
  templateUrl: './lineside-inspection.component.html',
  styleUrls: ['./lineside-inspection.component.css']
})
export class LineSideInspectionComponent implements OnInit {
    private headers = new Headers({'Content-Type': 'application/json'});
  
  @Input() inspect: LineSideInspection;
  private inspection: LineSideInspection;
    
    constructor(
        private http: Http,
        private alertService: AlertService,
        private inspectionService: LineSideInspectionService
    ) {}


  ngOnInit() {
  }

    sendMesage(inspection) {
        if(inspection.thresholdReached) {
            this.inspectionService.sendMesage(inspection);
        }
    }

    updateCount(inspection, rankName: string, rankPlusOrMinus: string)
    {
        inspection.rankName = rankName;
        inspection.rankPlusOrMinus = rankPlusOrMinus;
        this.inspectionService
            .update(inspection).then((res) => {
                setTimeout(()=>{
                     this.sendMesage(res);
                 },300);
              })
              .catch(function(rej) {
                console.log(rej);
              });
    }
    
}
