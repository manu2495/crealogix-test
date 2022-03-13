import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu = [
    { title: 'Films', url: 'films' },
    { title: 'People', url: 'people' },
    { title: 'Planets', url: 'planets' },
    { title: 'Species', url: 'species' },
    { title: 'Starships', url: 'starships' },
    { title: 'Vehicles', url: 'vehicles' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
