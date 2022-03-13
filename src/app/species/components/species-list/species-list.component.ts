import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
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

  reloadList: boolean = false;

  constructor(private router: Router,
              private searchService: SearchService,
              private speciesService: SpeciesService) {

    this.searchValue$ = this.searchService.getSearchValue$().subscribe(searchValues => {
      if (searchValues === '') {
        this.initSpecies();
      } else {
        this.reloadList = true;
        this.onSearchSpecies(searchValues);
      }
    })
  }

  ngOnInit(): void {
    this.initSpecies();
  }

  ngOnDestroy() {
    if (this.searchValue$) this.searchValue$.unsubscribe();
  }

  initSpecies() {
    this.reloadList = false;
    this.species$ = this.speciesService.getSpecies$();
  }

  onSearchSpecies(searchValue) {
    this.species$ = this.speciesService.getSpecies$(searchValue);
  }

  showSpecies(species) {
    this.speciesService.setSpecies(species);
    this.router.navigate(['/species/view']).then();
  }
}
