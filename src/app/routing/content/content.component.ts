import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IContent, ISearchResponse, ContentService } from 'src/app/services/content.service';
import { Subscription, Observable } from 'rxjs';
import { parseContent } from './content.processing.util';
import { debounceTime, startWith, switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'wiki-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('htmlPlaceholder', { static: true })
  htmlPlaceholder: ElementRef<HTMLElement>;

  @ViewChild('tocPlaceholder', { static: true })
  tocPlaceholder: ElementRef<HTMLElement>;

  tocOpened = false;
  title = '';
  html = '';
  wikipediaUrl = '';
  error: any = null;

  searchControl = new FormControl();
  articles$: Observable<ISearchResponse[]>;

  private dataSub: Subscription | null = null;
  private paramSub: Subscription | null = null;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private contentSvc: ContentService
  ) { }

  ngOnInit() {
    this.paramSub = this.activateRoute.paramMap.subscribe(pm => {
      this.wikipediaUrl = `https://en.wikipedia.org/wiki/${pm.get('wikiId')}`;
    });
    this.dataSub = this.activateRoute.data
      .pipe(debounceTime(100))
      .subscribe(({ content: { data: content, error } }: { content: { data: IContent, error: any } }) => {
        if (content) {
          this.title = content.title;
          this.html = content.text;
          const [tocHtml, contentHtml] = parseContent(this.html);
          this.htmlPlaceholder.nativeElement.innerHTML = '';
          this.htmlPlaceholder.nativeElement.appendChild(contentHtml);
          this.tocPlaceholder.nativeElement.innerHTML = '';
          this.tocPlaceholder.nativeElement.appendChild(tocHtml);
        }
        this.error = error || null;
      });

    this.articles$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      switchMap(query => this.contentSvc.openSearch(query)),
      map(result => result.map(u => ({ ...u, url: this.contentSvc.getID(u.url) })))
    );
  }
  ngAfterViewInit() { }

  ngOnDestroy() {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }
  select(event: MatAutocompleteSelectedEvent) {
    this.router.navigateByUrl(`/wiki/${event.option.value}`);
  }
}
