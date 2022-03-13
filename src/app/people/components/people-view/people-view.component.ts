import {Component, OnDestroy, OnInit} from '@angular/core';
import {PeopleService} from "../../services/people.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Person} from "../../models/person.model";

@Component({
  selector: 'app-people-view',
  templateUrl: './people-view.component.html',
  styleUrls: ['./people-view.component.scss']
})
export class PeopleViewComponent implements OnInit, OnDestroy {

  person$: Subscription;
  person: Person;

  constructor(private router: Router,
              private peopleService: PeopleService) {

    // get person from service
    // if person undefined, return to list
    this.person$ = this.peopleService.getPerson().subscribe(person => {
      if (person) {
        this.person = person;
      } else {
        this.router.navigate(['/people']).then();
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.person$) this.person$.unsubscribe();
  }
}
