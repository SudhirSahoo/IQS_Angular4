import {Component, OnInit}        from "@angular/core";
import {Router}                   from "@angular/router";

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty'

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {Contacts}           from "./Contacts";
import {ContactsService}   from "./Contacts.service";

/**
 * Angular component for the Contacts entity.
 *
 * @author Devin Spivey / Modified by Keith Barno
 * @since 7/4/2017
 */
@Component({
  selector: 'Contacts-component',
  templateUrl: './Contacts.component.html',
  providers: [ContactsService]
})
export class ContactsComponent implements OnInit {
  private observableContacts: Observable<Contacts[]>;
  private Contacts: Contacts[];
  private searchTerms = new Subject<string>();
  private showTable = false;

  constructor(private router: Router,
              private ContactsService: ContactsService) {
  }

  ngOnInit(): void {
    this.observableContacts = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        ? this.ContactsService.search(term)
        : this.ContactsService.findAll())
      .catch(error => {
        console.log(error);
        return Observable.of<Contacts[]>([]);
      });

    // subscribe to the count observable so that we update whether we need to show the table or the empty block
    this.ContactsService.count.subscribe(count => this.showTable = (count > 0));

    // subscribe to the array observable to trigger the appropriate service call
    // save the emitted values in the array
    this.observableContacts.subscribe(array => this.Contacts = array);

    // initialize the first search with an empty term so that we return all
    this.searchTerms.next();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  resetSearch(searchBox): void {
    // feed in a blank search so we get all items back
    this.searchTerms.next();

    // reset text in the search box
    searchBox.value = "";
  }

  update(Contacts: Contacts): void {
    this.router.navigate(['/Contacts/update', Contacts.ContactsId]);
  }

  create(): void {
    this.router.navigate(['/Contacts/create']);
  }

  delete(Contacts: Contacts): void {
    if (confirm(`Are you sure you want to delete Contacts "${Contacts.Contact_Name}"?`)) {
      this.ContactsService
        .delete(Contacts)
        .then(() => {
          this.Contacts = this.Contacts.filter(x => x !== Contacts);

          // update count so we display the correct template if the array is now empty
          this.ContactsService.count.next(this.Contacts.length);
        });
    }
  }
}
