import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Species} from "../../models/species.model";
import {SpeciesService} from "../../services/species.service";

@Component({
  selector: 'app-species-view',
  templateUrl: './species-view.component.html',
  styleUrls: ['./species-view.component.scss']
})
export class SpeciesViewComponent implements OnInit, OnDestroy {

  species$: Subscription;
  species: Species;

  constructor(private router: Router,
              private speciesService: SpeciesService) {
    this.species$ = this.speciesService.getSpecies().subscribe(data => {
      if (data) {
        this.species = data;
      } else {
        this.router.navigate(['/species']).then();
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.species$) this.species$.unsubscribe();
  }
}
