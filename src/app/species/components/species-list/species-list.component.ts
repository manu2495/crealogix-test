import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../../shared/services/search.service";
import {Species} from "../../models/species.model";
import {SpeciesService} from "../../services/species.service";

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss']
})
export class SpeciesListComponent implements OnInit, OnDestroy {

  species$: Observable<Species[]>;
  searchValue$: Subscription;
  activatedRoute$: Subscription;

  hasParams: boolean = false;
  reloadList: boolean = false;

  constructor(private router: Router,
              private searchService: SearchService,
              private speciesService: SpeciesService,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute$ = this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.search) {
        this.hasParams = true;
        this.reloadList = true;
        this.onSearchSpecies(params.search);

        // if someone write a params manually that does not exists in filterable list
        // update localstorage with that value
        this.searchService.setSearchValues$(params.search, '/species');
      } else {
        this.initSpecies();
      }
    });

    this.searchValue$ = this.searchService.getSearchValue$().subscribe(searchValues => {
      if (searchValues && searchValues.fromUrl === '/species') {
        this.reloadList = true;
        this.onSearchSpecies(searchValues.value);
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.searchValue$) this.searchValue$.unsubscribe();
    if (this.activatedRoute$) this.activatedRoute$.unsubscribe();
  }

  initSpecies() {
    this.reloadList = false;
    this.species$ = this.speciesService.getSpecies$();

    // remove query params from url if all list is reload
    if (this.hasParams) {
      this.router.navigate(['/species']).then(() => {
        this.hasParams = false;
      });
    }
  }

  onSearchSpecies(searchValue) {
    this.species$ = this.speciesService.getSpecies$(searchValue);
  }

  showSpecies(species) {
    this.speciesService.setSpecies(species);
    this.router.navigate(['/species/view']).then();
  }
}
