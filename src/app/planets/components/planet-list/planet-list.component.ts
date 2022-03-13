import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../../shared/services/search.service";
import {Planet} from "../../models/planet.model";
import {PlanetService} from "../../services/planet.service";

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit, OnDestroy {
  planets$: Observable<Planet[]>;
  searchValue$: Subscription;
  activatedRoute$: Subscription;

  hasParams: boolean = false;
  reloadList: boolean = false;

  constructor(private router: Router,
              private planetService: PlanetService,
              private searchService: SearchService,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute$ = this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.search) {
        this.hasParams = true;
        this.reloadList = true;
        this.onSearchPlanets(params.search);

        // if someone write a params manually that does not exists in filterable list
        // update localstorage with that value
        this.searchService.setSearchValues$(params.search, '/planets');
      } else {
        this.initPlanets();
      }
    });

    this.searchValue$ = this.searchService.getSearchValue$().subscribe(searchValues => {
      if (searchValues && searchValues.fromUrl === '/planets') {
        this.reloadList = true;
        this.onSearchPlanets(searchValues.value);
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.searchValue$) this.searchValue$.unsubscribe();
    if (this.activatedRoute$) this.activatedRoute$.unsubscribe();
  }

  initPlanets() {
    this.reloadList = false;
    this.planets$ = this.planetService.planets$();

    // remove query params from url if all list is reload
    if (this.hasParams) {
      this.router.navigate(['/planets']).then(() => {
        this.hasParams = false;
      });
    }
  }

  onSearchPlanets(searchValue) {
    this.planets$ = this.planetService.planets$(searchValue);
  }

  showPlanet(planet) {
    this.planetService.setPlanet(planet);
    this.router.navigate(['/planets/view']).then();
  }
}
