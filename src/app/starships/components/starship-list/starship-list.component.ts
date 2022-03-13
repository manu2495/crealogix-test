import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {StarshipService} from "../../services/starship.service";
import {Router} from "@angular/router";
import {SearchService} from "../../../shared/services/search.service";
import {Starship} from "../../models/starship.model";

@Component({
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss']
})
export class StarshipListComponent implements OnInit, OnDestroy {

  starships$: Observable<Starship[]>;
  searchValue$: Subscription;

  reloadList: boolean = false;

  constructor(private router: Router,
              private searchService: SearchService,
              private starshipService: StarshipService) {


    this.searchValue$ = this.searchService.getSearchValue$().subscribe(searchValues => {
      if (searchValues === '') {
        this.initStarships();
      } else {
        this.reloadList = true;
        this.onSearchStarships(searchValues);
      }
    })
  }

  ngOnInit(): void {
    this.initStarships();
  }

  ngOnDestroy() {
    if (this.searchValue$) this.searchValue$.unsubscribe();
  }

  initStarships() {
    this.reloadList = false;
    this.starships$ = this.starshipService.starships$();
  }

  onSearchStarships(searchValue) {
    this.starships$ = this.starshipService.starships$(searchValue);
  }

  showStarship(starship) {
    this.starshipService.setStarship(starship);
    this.router.navigate(['/starships/view']).then();
  }
}
