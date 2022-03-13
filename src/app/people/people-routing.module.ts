import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from "./components/people-list/people-list.component";
import { PeopleViewComponent } from "./components/people-view/people-view.component";

const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent
  },
  {
    path: 'view',
    component: PeopleViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
