import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetListComponent } from "./components/planet-list/planet-list.component";
import { PlanetViewComponent } from "./components/planet-view/planet-view.component";

const routes: Routes = [
  {
    path: '', component: PlanetListComponent
  },
  {
    path: 'view', component: PlanetViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanetsRoutingModule { }
