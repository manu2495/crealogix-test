import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchValue$: Subject<string> = new BehaviorSubject('');
  searchValues$: Subject<string[]> = new BehaviorSubject([]);

  constructor() { }

  setSearchValue$(searchValue, saveInStorage = true) {
    this.searchValue$.next(searchValue);

    if (saveInStorage)
      this.setSearchValues$(searchValue);
  }

  setSearchValues$(searchValue) {
    // get values from localstorage
    let searchValues: string[] = JSON.parse(localStorage.getItem('searchValues'));
    if (!searchValues) searchValues = [];

    // update localstorage
    // if searchValue already exists in array, do not add again
    if (!searchValues.some(e => e === searchValue)) {
      searchValues.unshift(searchValue);
      const newSearchValues = searchValues.slice(0, 4);

      localStorage.setItem('searchValues', JSON.stringify(newSearchValues));
      this.searchValues$.next(newSearchValues);
    }
  }

  getSearchValue$() {
    return this.searchValue$.asObservable();
  }

  getSearchValues$() {
    return this.searchValues$.asObservable();
  }

  getSearchValuesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('searchValues')) || [];
  }
}
