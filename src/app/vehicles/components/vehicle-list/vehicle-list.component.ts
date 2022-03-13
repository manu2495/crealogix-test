import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../../shared/services/search.service";
import {Vehicle} from "../../models/vehicle.model";
import {VehicleService} from "../../services/vehicle.service";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit, OnDestroy {

  vehicles$: Observable<Vehicle[]>;
  searchValue$: Subscription;
  activatedRoute$: Subscription;

  hasParams: boolean = false;
  reloadList: boolean = false;

  constructor(private router: Router,
              private searchService: SearchService,
              private vehicleService: VehicleService,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute$ = this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.search) {
        this.hasParams = true;
        this.reloadList = true;
        this.onSearchVehicles(params.search);

        // if someone write a params manually that does not exists in filterable list
        // update localstorage with that value
        this.searchService.setSearchValues$(params.search, '/vehicles');
      } else {
        this.initVehicles();
      }
    });

    this.searchValue$ = this.searchService.getSearchValue$().subscribe(searchValues => {
      if (searchValues && searchValues.fromUrl === '/vehicles') {
        this.reloadList = true;
        this.onSearchVehicles(searchValues.value);
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.searchValue$) this.searchValue$.unsubscribe();
    if (this.activatedRoute$) this.activatedRoute$.unsubscribe();
  }

  initVehicles() {
    this.reloadList = false;
    this.vehicles$ = this.vehicleService.vehicles$();

    // remove query params from url if all list is reload
    if (this.hasParams) {
      this.router.navigate(['/vehicles']).then(() => {
        this.hasParams = false;
      });
    }
  }

  onSearchVehicles(searchValue) {
    this.vehicles$ = this.vehicleService.vehicles$(searchValue);
  }

  showVehicle(vehicle) {
    this.vehicleService.setVehicle(vehicle);
    this.router.navigate(['/vehicles/view']).then();
  }
}
