import { Injectable } from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, mergeMap} from "rxjs/operators";
import {Species} from "../models/species.model";

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  species$: Subject<Species> = new BehaviorSubject<Species>(undefined);

  constructor(private http: HttpClient) { }

  getSpecies$(searchValue = ''): Observable<Species[]> {
    let url = 'https://swapi.dev/api/species';
    if (searchValue !== '') url = `${url}?search=${searchValue}`;

    return this.http
      .get(url)
      .pipe(
        map((result: any) => result.results),
        mergeMap<any, Observable<any>>(result => {
          return forkJoin(
            result.map(species => {
              if (species.homeworld) {
                return this.http.get(species.homeworld).pipe(
                  map((planet: any) => {
                    return new Species({ ...species, homeWorld: planet.name });
                  })
                )
              } else {
                return of(new Species({ ...species, homeWorld: 'N/A' }));
              }
            })
          );
        })
      );
  }

  getSpecies() {
    return this.species$.asObservable();
  }

  setSpecies(species) {
    this.species$.next(species);
  }
}
