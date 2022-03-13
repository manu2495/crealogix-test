import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeciesRoutingModule } from './species-routing.module';
import { SpeciesListComponent } from './components/species-list/species-list.component';
import { SpeciesViewComponent } from './components/species-view/species-view.component';


@NgModule({
  declarations: [
    SpeciesListComponent,
    SpeciesViewComponent
  ],
  imports: [
    CommonModule,
    SpeciesRoutingModule
  ]
})
export class SpeciesModule { }
