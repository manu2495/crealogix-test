import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {SearchService} from "../../../shared/services/search.service";
import {Vehicle} from "../models/vehicle.model";
import {VehicleService} from "../../services/vehicle.service";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit, OnDestroy {

  vehicles$: Observable<Vehicle[]>;
  searchValue$: Subscription;

  reloadList: boolean = false;

  constructor(private router: Router,
              private searchService: SearchService,
              private vehicleService: VehicleService) {

    this.searchValue$ = this.searchService.getSearchValue$().subscribe(searchValues => {
      if (searchValues === '') {
        this.initVehicles();
      } else {
        this.reloadList = true;
        this.onSearchVehicles(searchValues);
      }
    })
  }

  ngOnInit(): void {
    this.initVehicles();
  }

  ngOnDestroy() {
    if (this.searchValue$) this.searchValue$.unsubscribe();
  }

  initVehicles() {
    this.reloadList = false;
    this.vehicles$ = this.vehicleService.vehicles$();
  }

  onSearchVehicles(searchValue) {
    this.vehicles$ = this.vehicleService.vehicles$(searchValue);
  }

  showVehicle(vehicle) {
    this.vehicleService.setVehicle(vehicle);
    this.router.navigate(['/vehicles/view']).then();
  }
}
