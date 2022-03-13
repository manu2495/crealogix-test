import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISearchValue, SearchService} from "../../services/search.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {

  searchValue: string = '';
  searchValues: ISearchValue[] = [];
  searchValues$: Subscription;

  constructor(private router: Router,
              private searchService: SearchService) {
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

    let url = this.router.url.replace('/view', '');
    this.searchService.setSearchValue$(searchValue === '' ? this.searchValue : searchValue, url, saveInStorage);
    this.searchValue = '';
  }

  onSearchFromUrl(searchValue: ISearchValue) {
    this.router.navigate([searchValue.fromUrl], {
      queryParams: {
        search: searchValue.value
      }
    }).then();
  }
}
