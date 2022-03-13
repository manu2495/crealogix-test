import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetListComponent } from './components/planet-list/planet-list.component';
import { PlanetViewComponent } from './components/planet-view/planet-view.component';


@NgModule({
  declarations: [
    PlanetListComponent,
    PlanetViewComponent
  ],
  imports: [
    CommonModule,
    PlanetsRoutingModule
  ]
})
export class PlanetsModule { }
