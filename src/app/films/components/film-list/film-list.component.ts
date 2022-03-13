import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {SearchService} from "../../../shared/services/search.service";
import {Film} from "../../models/film.model";
import {FilmService} from "../../services/film.service";

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit, OnDestroy {

  films$: Observable<Film[]>;
  searchValue$: Subscription;

  reloadList: boolean = false;

  constructor(private router: Router,
              private filmService: FilmService,
              private searchService: SearchService) {

    this.searchValue$ = this.searchService.getSearchValue$().subscribe(searchValues => {
      if (searchValues === '') {
        this.initFilms();
      } else {
        this.reloadList = true;
        this.onSearchFilms(searchValues);
      }
    })
  }

  ngOnInit(): void {
    this.initFilms();
  }

  ngOnDestroy() {
    if (this.searchValue$) this.searchValue$.unsubscribe();
  }

  initFilms() {
    this.reloadList = false;
    this.films$ = this.filmService.films$();
  }

  onSearchFilms(searchValue) {
    this.films$ = this.filmService.films$(searchValue);
  }

  showFilm(film) {
    this.filmService.setFilm(film);
    this.router.navigate(['/films/view']).then();
  }
}
