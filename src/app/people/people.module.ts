import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PeopleViewComponent } from './components/people-view/people-view.component';


@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleViewComponent,
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
  ]
})
export class PeopleModule { }
