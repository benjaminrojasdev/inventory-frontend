import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router'
import { MaterialModule } from '../../material.module';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule,MaterialModule,RouterLink,CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name: "Inicio", route:"home", icon: "home"},
    {name: "Categorias", route:"category", icon: "category"},
    {name: "Productos", route:"product", icon: "production_quantity_limits"}
  ]

  constructor(media:MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

}
