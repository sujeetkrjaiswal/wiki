import { Component, OnInit } from '@angular/core';
import { ContentService, ISearchResponse } from 'src/app/services/content.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, switchMap, debounceTime, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Router } from '@angular/router';



@Component({
  selector: 'wiki-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchControl = new FormControl();
  articles$: Observable<ISearchResponse[]>;
  // tslint:disable: max-line-length
  featuredArticles: ISearchResponse[] = [{
    title: 'Game of Throne',
    url: '/wiki/Game_of_Thrones',
    description: `Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss for HBO. It is an adaptation of A Song of Ice and Fire, George R. R. Martin's series of fantasy novels, the first of which is A Game of Thrones. The show was both produced and filmed in Belfast and elsewhere in the United Kingdom. Filming locations also included Canada, Croatia, Iceland, Malta, Morocco, and Spain. The series premiered on HBO in the United States on April 17, 2011, and concluded on May 19, 2019, with 73 episodes broadcast over eight seasons.`
  }, {
    title: 'Artificial neural network',
    description: `Artificial neural networks (ANN) or connectionist systems are computing systems that are inspired by, but not identical to, biological neural networks that constitute animal brains. Such systems "learn" to perform tasks by considering examples, generally without being programmed with task-specific rules. For example, in image recognition, they might learn to identify images that contain cats by analyzing example images that have been manually labeled as "cat" or "no cat" and using the results to identify cats in other images. They do this without any prior knowledge of cats, for example, that they have fur, tails, whiskers and cat-like faces. Instead, they automatically generate identifying characteristics from the examples that they process.`,
    url: '/wiki/Artificial_neural_network'
  }, {
    title: 'Web development',
    url: '/wiki/Web_development',
    description: `Web development is the work involved in developing a web site for the Internet (World Wide Web) or an intranet (a private network). Web development can range from developing a simple single static page of plain text to complex web-based internet applications (web apps), electronic businesses, and social network services. A more comprehensive list of tasks to which web development commonly refers, may include web engineering, web design, web content development, client liaison, client-side/server-side scripting, web server and network security configuration, and e-commerce development.`
  }];

  constructor(
    private router: Router,
    private contentSvc: ContentService
  ) { }

  async ngOnInit() {
    this.articles$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      switchMap(query => this.contentSvc.openSearch(query)),
      map(result => result.map(u => ({ ...u, url: this.contentSvc.getID(u.url) })))
    );
  }

  select(event: MatAutocompleteSelectedEvent) {
    this.router.navigate(['wiki', event.option.value]);
  }

}
