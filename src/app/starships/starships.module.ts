import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipsRoutingModule } from './starships-routing.module';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { StarshipViewComponent } from './components/starship-view/starship-view.component';


@NgModule({
  declarations: [
    StarshipListComponent,
    StarshipViewComponent
  ],
  imports: [
    CommonModule,
    StarshipsRoutingModule
  ]
})
export class StarshipsModule { }
