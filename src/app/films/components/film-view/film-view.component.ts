import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Film} from "../../models/film.model";
import {FilmService} from "../../services/film.service";

@Component({
  selector: 'app-film-view',
  templateUrl: './film-view.component.html',
  styleUrls: ['./film-view.component.scss']
})
export class FilmViewComponent implements OnInit, OnDestroy {

  film$: Subscription;
  film: Film;

  constructor(private router: Router,
              private filmService: FilmService) {
    this.film$ = this.filmService.getFilm().subscribe(data => {
      if (data) {
        this.film = data;
      } else {
        this.router.navigate(['/films']).then();
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.film$) this.film$.unsubscribe();
  }
}
