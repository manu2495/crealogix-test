import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
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

  reloadList: boolean = false;

  constructor(private router: Router,
              private planetService: PlanetService,
              private searchService: SearchService) {

    this.searchValue$ = this.searchService.getSearchValue$().subscribe(searchValues => {
      if (searchValues === '') {
        this.initPlanets();
      } else {
        this.reloadList = true;
        this.onSearchPlanets(searchValues);
      }
    })
  }

  ngOnInit(): void {
    this.initPlanets();
  }

  ngOnDestroy() {
    if (this.searchValue$) this.searchValue$.unsubscribe();
  }

  initPlanets() {
    this.reloadList = false;
    this.planets$ = this.planetService.planets$();
  }

  onSearchPlanets(searchValue) {
    this.planets$ = this.planetService.planets$(searchValue);
  }

  showPlanet(planet) {
    this.planetService.setPlanet(planet);
    this.router.navigate(['/planets/view']).then();
  }
}
