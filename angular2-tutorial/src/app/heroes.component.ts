import { Component, OnInit, } from '@angular/core'
import { Router, } from '@angular/router'
import { Http, } from '@angular/http'

import { Hero, } from './hero'
import { HeroService, } from './hero.service'

@Component({
  selector: 'my-heroes',
  styleUrls: [ './heroes.component.css', ],
  templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {
  constructor(
    private router: Router,
    private heroService: HeroService
  ) {}

  heroes: Hero[]
  selectedHero: Hero

  ngOnInit(): void {
    this.fetchHeroes()
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id])
  }

  add(name: string): void {
    name = name.trim()
    if (!name) { return }

    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero)
        this.selectedHero = null
      })
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h != hero)
        if (this.selectedHero === hero) { this.selectedHero = null }
      })
  }

  fetchHeroes(): void {
    this.heroService.getHeroes()
      .then(heroes => {
        this.heroes = heroes
      })
  }

}
