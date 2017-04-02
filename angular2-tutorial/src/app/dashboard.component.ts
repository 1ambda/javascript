import { Component, OnInit, } from '@angular/core'

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css', ],
})
export class DashboardComponent implements OnInit {
  constructor(private heroService: HeroService) { }

  heroes: Hero[] = [];

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(hereos => {
        this.heroes = hereos.slice(1, 5)
      })
  }
}
