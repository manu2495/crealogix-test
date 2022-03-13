import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {VehicleService} from "../../services/vehicle.service";
import {Vehicle} from "../models/vehicle.model";

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.scss']
})
export class VehicleViewComponent implements OnInit, OnDestroy {

  vehicle$: Subscription;
  vehicle: Vehicle;

  constructor(private router: Router,
              private vehicleService: VehicleService) {
    this.vehicle$ = this.vehicleService.getVehicle().subscribe(data => {
      if (data) {
        this.vehicle = data;
      } else {
        this.router.navigate(['/vehicles']).then();
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.vehicle$) this.vehicle$.unsubscribe();
  }
}
