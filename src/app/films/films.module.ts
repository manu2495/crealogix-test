import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmViewComponent } from './components/film-view/film-view.component';


@NgModule({
  declarations: [
    FilmListComponent,
    FilmViewComponent
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
  ]
})
export class FilmsModule { }
