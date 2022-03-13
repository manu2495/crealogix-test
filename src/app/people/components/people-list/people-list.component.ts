import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {PeopleService} from "../../services/people.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  activatedRoute$: Subscription;

  hasParams: boolean = false;
  reloadList: boolean = false;

  constructor(private router: Router,
              private searchService: SearchService,
              private peopleService: PeopleService,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute$ = this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.search) {
        this.hasParams = true;
        this.reloadList = true;
        this.onSearchPeople(params.search);

        // if someone write a params manually that does not exists in filterable list
        // update localstorage with that value
        this.searchService.setSearchValues$(params.search, '/people');
      } else {
        this.initPeople();
      }
    });

    this.searchValue$ = this.searchService.getSearchValue$().subscribe(searchValues => {
      if (searchValues && searchValues.fromUrl === '/people') {
        this.reloadList = true;
        this.onSearchPeople(searchValues.value);
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.searchValue$) this.searchValue$.unsubscribe();
    if (this.activatedRoute$) this.activatedRoute$.unsubscribe();
  }

  initPeople() {
    this.reloadList = false;
    this.people$ = this.peopleService.people$();

    // remove query params from url if all list is reload
    if (this.hasParams) {
      this.router.navigate(['/people']).then(() => {
        this.hasParams = false;
      });
    }
  }

  onSearchPeople(searchValue) {
    this.people$ = this.peopleService.people$(searchValue);
  }

  showPerson(person) {
    this.peopleService.setPerson(person);
    this.router.navigate(['/people/view']).then();
  }
}
