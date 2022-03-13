import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
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
  activatedRoute$: Subscription;

  hasParams: boolean = false;
  reloadList: boolean = false;

  constructor(private router: Router,
              private filmService: FilmService,
              private searchService: SearchService,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute$ = this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.search) {
        this.hasParams = true;
        this.reloadList = true;
        this.onSearchFilms(params.search);

        this.searchService.setSearchValues$(params.search, '/films');
      } else {
        this.initFilms();
      }
    });

    this.searchValue$ = this.searchService.getSearchValue$().subscribe(searchValues => {
      if (searchValues && searchValues.fromUrl === '/films') {
        this.reloadList = true;
        this.onSearchFilms(searchValues.value);
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.searchValue$) this.searchValue$.unsubscribe();
    if (this.activatedRoute$) this.activatedRoute$.unsubscribe();
  }

  initFilms() {
    this.reloadList = false;
    this.films$ = this.filmService.films$();

    // remove query params from url if all list is reload
    if (this.hasParams) {
      this.router.navigate(['/films']).then(() => {
        this.hasParams = false;
      });
    }
  }

  onSearchFilms(searchValue) {
    this.films$ = this.filmService.films$(searchValue);
  }

  showFilm(film) {
    this.filmService.setFilm(film);
    this.router.navigate(['/films/view']).then();
  }
}
