import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty'

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {Associate} from './associate';
import {AssociateService} from './associate.service';

/**
 * Angular component for the Associate entity.
 *
 * @author vfc91343
 * @since 4/4/2018
 */
@Component({
  selector: 'associate-component',
  templateUrl: './associate.component.html',
  providers: [AssociateService]
})
export class AssociateComponent implements OnInit {
  private observableAssociates: Observable<Associate[]>;
  private associates: Associate[];
  private searchTerms = new Subject<string>();
  private showTable = false;

  constructor(private router: Router,
              private associateService: AssociateService) {
  }

  ngOnInit(): void {
    this.observableAssociates = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        ? this.associateService.search(term)
        : this.associateService.findAll())
      .catch(error => {
        console.log(error);
        return Observable.of<Associate[]>([]);
      });

    // subscribe to the count observable so that we update whether we need to show the table or the empty block
    this.associateService.count.subscribe(count => this.showTable = (count > 0));

    // subscribe to the array observable to trigger the appropriate service call
    // save the emitted values in the array
    this.observableAssociates.subscribe(array => this.associates = array);

    // initialize the first search with an empty term so that we return all
    this.searchTerms.next();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }



}
