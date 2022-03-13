import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Planet} from "../models/planet.model";

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  planet$: Subject<Planet> = new BehaviorSubject<Planet>(undefined);

  constructor(private http: HttpClient) { }

  planets$(searchValue = ''): Observable<Planet[]> {
    let url = 'https://swapi.dev/api/planets';
    if (searchValue !== '') url = `${url}?search=${searchValue}`;

    return this.http
      .get(url)
      .pipe(
        map((result: any) => result.results.map(e => new Planet(e))),
      );
  }

  getPlanet() {
    return this.planet$.asObservable();
  }

  setPlanet(planet) {
    this.planet$.next(planet);
  }
}
