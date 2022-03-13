import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Starship } from "../models/starship.model";

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  starship$: Subject<Starship> = new BehaviorSubject<Starship>(undefined);

  constructor(private http: HttpClient) { }

  starships$(searchValue = ''): Observable<Starship[]> {
    let url = 'https://swapi.dev/api/starships';
    if (searchValue !== '') url = `${url}?search=${searchValue}`;

    return this.http
      .get(url)
      .pipe(
        map((result: any) => result.results.map(e => new Starship(e)))
      );
  }

  getStarship() {
    return this.starship$.asObservable();
  }

  setStarship(starship) {
    this.starship$.next(starship);
  }
}
