import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Vehicle} from "../components/models/vehicle.model";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicle$: Subject<Vehicle> = new BehaviorSubject<Vehicle>(undefined);

  constructor(private http: HttpClient) { }

  vehicles$(searchValue = ''): Observable<Vehicle[]> {
    let url = 'https://swapi.dev/api/vehicles';
    if (searchValue !== '') url = `${url}?search=${searchValue}`;

    return this.http
      .get(url)
      .pipe(
        map((result: any) => result.results.map(e => new Vehicle(e))),
      );
  }

  getVehicle() {
    return this.vehicle$.asObservable();
  }

  setVehicle(vehicle) {
    this.vehicle$.next(vehicle);
  }
}
