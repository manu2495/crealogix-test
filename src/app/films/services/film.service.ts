import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Film } from "../models/film.model";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  film$: Subject<Film> = new BehaviorSubject<Film>(undefined);

  constructor(private http: HttpClient) { }

  films$(searchValue = ''): Observable<Film[]> {
    let url = 'https://swapi.dev/api/films';
    if (searchValue !== '') url = `${url}?search=${searchValue}`;

    return this.http
      .get(url)
      .pipe(
        map((result: any) => result.results.map(e => new Film(e))),
      );
  }

  getFilm() {
    return this.film$.asObservable();
  }

  setFilm(film) {
    this.film$.next(film);
  }
}
