import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Planet} from "../../models/planet.model";
import {PlanetService} from "../../services/planet.service";

@Component({
  selector: 'app-planet-view',
  templateUrl: './planet-view.component.html',
  styleUrls: ['./planet-view.component.scss']
})
export class PlanetViewComponent implements OnInit, OnDestroy {

  planet$: Subscription;
  planet: Planet;

  constructor(private router: Router,
              private planetService: PlanetService) {
    this.planet$ = this.planetService.getPlanet().subscribe(data => {
      if (data) {
        this.planet = data;
      } else {
        this.router.navigate(['/planets']).then();
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.planet$) this.planet$.unsubscribe();
  }
}
