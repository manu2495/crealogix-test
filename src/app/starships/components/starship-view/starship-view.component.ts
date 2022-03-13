import {Component, OnDestroy, OnInit} from '@angular/core';
import {StarshipService} from "../../services/starship.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Starship} from "../../models/starship.model";

@Component({
  selector: 'app-starship-view',
  templateUrl: './starship-view.component.html',
  styleUrls: ['./starship-view.component.scss']
})
export class StarshipViewComponent implements OnInit, OnDestroy {

  starship$: Subscription;
  starship: Starship;

  constructor(private router: Router,
              private starshipService: StarshipService) {
    this.starship$ = this.starshipService.getStarship().subscribe(data => {
      if (data) {
        this.starship = data;
      } else {
        this.router.navigate(['/starships']).then();
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.starship$) this.starship$.unsubscribe();
  }
}
