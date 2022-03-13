import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FilmListComponent} from "./components/film-list/film-list.component";
import {FilmViewComponent} from "./components/film-view/film-view.component";

const routes: Routes = [
  {
    path: '', component: FilmListComponent
  },
  {
    path: 'view', component: FilmViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
