import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StarshipListComponent} from "./components/starship-list/starship-list.component";
import {StarshipViewComponent} from "./components/starship-view/starship-view.component";

const routes: Routes = [
  { path: '', component: StarshipListComponent },
  { path: 'view', component: StarshipViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarshipsRoutingModule { }
