import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {

  searchValue: string = '';
  searchValues: string[] = [];
  searchValues$: Subscription;

  constructor(private searchService: SearchService) {
    this.searchValues$ = this.searchService.getSearchValues$().subscribe(searchValues => {
      if (searchValues.length === 0) {
        this.searchValues = this.searchService.getSearchValuesFromLocalStorage();
      } else {
        this.searchValues = searchValues;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.searchValues$) this.searchValues$.unsubscribe();
  }

  onSearch(searchValue = '', saveInStorage = true) {
    if (searchValue === '' && this.searchValue === '') return;

    this.searchService.setSearchValue$(searchValue === '' ? this.searchValue : searchValue, saveInStorage);
    this.searchValue = '';
  }
}
