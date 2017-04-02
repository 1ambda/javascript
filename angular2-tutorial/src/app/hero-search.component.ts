import { Component, OnInit, } from '@angular/core'
import { Router, }            from '@angular/router'
import { Observable, }        from 'rxjs/Observable'
import { Subject, }           from 'rxjs/Subject'

import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'

import { HeroSearchService, } from './hero-search.service'
import { Hero, } from './hero'

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css', ],
  providers: [ HeroSearchService, ]
})
export class HeroSearchComponent implements OnInit {
  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) {}

  heroes: Observable<Hero[]>
  private searchTerms = new Subject<string>()

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300) // wait 300ms
      .distinctUntilChanged() // ignore ig next search term is same as previous
      .switchMap(term => {
        return term ? this.heroSearchService.search(term) :
          Observable.of<Hero[]>([]) // return empty heroes if term is empty
      })
      .catch(error => {
        console.log(error)
        return Observable.of<Hero[]>([])
      })
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
