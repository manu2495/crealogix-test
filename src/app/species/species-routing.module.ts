import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SpeciesListComponent} from "./components/species-list/species-list.component";
import {SpeciesViewComponent} from "./components/species-view/species-view.component";

const routes: Routes = [
  {
    path: '', component: SpeciesListComponent
  },
  {
    path: 'view', component: SpeciesViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeciesRoutingModule { }
