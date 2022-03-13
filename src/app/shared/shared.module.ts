import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import {FormsModule} from "@angular/forms";
import { MenuComponent } from './components/menu/menu.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    TopbarComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    TopbarComponent,
    MenuComponent
  ]
})
export class SharedModule { }
