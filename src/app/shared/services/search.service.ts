import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

export interface ISearchValue {
  value: string;
  fromUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchValue$: Subject<ISearchValue> = new BehaviorSubject(undefined);
  searchValues$: Subject<ISearchValue[]> = new BehaviorSubject([]);

  constructor() { }

  setSearchValue$(searchValue, fromUrl, saveInStorage = true) {
    this.searchValue$.next({ value: searchValue, fromUrl });

    if (saveInStorage)
      this.setSearchValues$(searchValue, fromUrl);
  }

  setSearchValues$(searchValue, fromUrl) {
    // get values from localstorage
    let searchValues: ISearchValue[] = JSON.parse(localStorage.getItem('searchValues'));
    if (!searchValues) searchValues = [];

    // update localstorage
    // if searchValue already exists in array, do not add again
    if (!searchValues.some(e => e.value === searchValue)) {
      searchValues.unshift({ value: searchValue, fromUrl });
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
