import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {PeopleService} from "../../services/people.service";
import {Router} from "@angular/router";
import {SearchService} from "../../../shared/services/search.service";
import {Person} from "../../models/person.model";

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit, OnDestroy {

  people$: Observable<Person[]>;
  searchValue$: Subscription;

  reloadList: boolean = false;

  constructor(private router: Router,
              private searchService: SearchService,
              private peopleService: PeopleService) {

    this.searchValue$ = this.searchService.getSearchValue$().subscribe(searchValues => {
      if (searchValues === '') {
        this.initPeople();
      } else {
        this.reloadList = true;
        this.onSearchPeople(searchValues);
      }
    });
  }

  ngOnInit(): void {
    this.initPeople();
  }

  ngOnDestroy() {
    if (this.searchValue$) this.searchValue$.unsubscribe();
  }

  initPeople() {
    this.reloadList = false;
    this.people$ = this.peopleService.people$();
  }

  onSearchPeople(searchValue) {
    this.people$ = this.peopleService.people$(searchValue);
  }

  showPerson(person) {
    this.peopleService.setPerson(person);
    this.router.navigate(['/people/view']).then();
  }
}
