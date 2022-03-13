import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {StarshipService} from "../../services/starship.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  activatedRoute$: Subscription;

  hasParams: boolean = false;
  reloadList: boolean = false;

  constructor(private router: Router,
              private searchService: SearchService,
              private activatedRoute: ActivatedRoute,
              private starshipService: StarshipService) {

    this.activatedRoute$ = this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.search) {
        this.hasParams = true;
        this.reloadList = true;
        this.onSearchStarships(params.search);

        // if someone write a params manually that does not exists in filterable list
        // update localstorage with that value
        this.searchService.setSearchValues$(params.search, '/starships');
      } else {
        this.initStarships();
      }
    });

    this.searchValue$ = this.searchService.getSearchValue$().subscribe(searchValues => {
      if (searchValues && searchValues.fromUrl === '/starships') {
        this.reloadList = true;
        this.onSearchStarships(searchValues.value);
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.searchValue$) this.searchValue$.unsubscribe();
    if (this.activatedRoute$) this.activatedRoute$.unsubscribe();
  }

  initStarships() {
    this.reloadList = false;
    this.starships$ = this.starshipService.starships$();

    // remove query params from url if all list is reload
    if (this.hasParams) {
      this.router.navigate(['/starships']).then(() => {
        this.hasParams = false;
      });
    }
  }

  onSearchStarships(searchValue) {
    this.starships$ = this.starshipService.starships$(searchValue);
  }

  showStarship(starship) {
    this.starshipService.setStarship(starship);
    this.router.navigate(['/starships/view']).then();
  }
}
