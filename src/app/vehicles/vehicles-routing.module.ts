import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VehicleListComponent} from "./components/vehicle-list/vehicle-list.component";
import {VehicleViewComponent} from "./components/vehicle-view/vehicle-view.component";

const routes: Routes = [
  {
    path: '', component: VehicleListComponent
  },
  {
    path: 'view', component: VehicleViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
