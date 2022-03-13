import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, mergeMap} from "rxjs/operators";
import {BehaviorSubject, forkJoin, Observable, Subject} from "rxjs";
import {Person} from "../models/person.model";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  person$: Subject<Person> = new BehaviorSubject<Person>(undefined);

  constructor(private http: HttpClient) { }

  people$(searchValue = ''): Observable<Person[]> {
    let url = 'https://swapi.dev/api/people';
    if (searchValue !== '') url = `${url}?search=${searchValue}`;

    return this.http
      .get(url)
      .pipe(
        map((result: any) => result.results),
        mergeMap<any, Observable<any>>(result => {
          return forkJoin(
            result.map(person => {
              return this.http.get(person.homeworld).pipe(
                map((planet: any) => {
                  return new Person({ ...person, homeWorld: planet.name });
                })
              )
            })
          );
        })
      );
  }

  getPerson() {
    return this.person$.asObservable();
  }

  setPerson(person) {
    this.person$.next(person);
  }
}
