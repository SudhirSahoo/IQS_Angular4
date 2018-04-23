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
import 'rxjs/add/operator/switchMap';

import {Contact} from '../contact/contact';
import {ContactService} from '../contact/contact.service';

@Component({
  selector: 'contact-component',
  templateUrl: './contact.component.html',
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
  private observableContact: Observable<Contact[]>;
  private Contact: Contact[];
  private searchTerms = new Subject<string>();
  private showTable = false;
  constructor(private router: Router,
  public ContactService: ContactService) {
}

ngOnInit(): void {
this.observableContact = this.searchTerms
.debounceTime(300)        // wait 300ms after each keystroke before considering the term
.distinctUntilChanged()   // ignore if next search term is same as previous
.switchMap(term => term   // switch to new observable each time the term changes
? this.ContactService.search(term)
: this.ContactService.findAll())
.catch(error => {
console.log(error);
return Observable.of<Contact[]>([]);
});

// subscribe to the count observable so that we update whether we need to show the table or the empty block
this.ContactService.count.subscribe(count => this.showTable = (count > 0));

// subscribe to the array observable to trigger the appropriate service call
// save the emitted values in the array
this.observableContact.subscribe(array => this.Contact = array);

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
  searchBox.value = '';
}

// update(contact: Contact): void {
//   this.router.navigate(['/contact/update', contact.contactId]);
// }

create(): void {
  this.router.navigate(['/contact/create']);
}
}
