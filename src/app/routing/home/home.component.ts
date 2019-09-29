import { Component, OnInit } from '@angular/core';
import { ContentService, ISearchResponse } from 'src/app/services/content.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, switchMap, debounceTime } from 'rxjs/operators';
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
  constructor(
    private router: Router,
    private contentSvc: ContentService
  ) { }

  async ngOnInit() {
    this.articles$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      switchMap(query => this.contentSvc.openSearch(query))
    );
  }

  select(event: MatAutocompleteSelectedEvent) {
    this.router.navigate(['wiki', this.contentSvc.getID(event.option.value)]);
  }

}
