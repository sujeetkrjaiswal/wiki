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
import { IContent } from 'src/app/services/content.service';
import { Subscription } from 'rxjs';
import { parseContent } from './content.processing.util';
import { debounceTime } from 'rxjs/operators';

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
  private dataSub: Subscription | null = null;
  private paramSub: Subscription | null = null;
  constructor(private router: Router, private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.paramSub = this.activateRoute.paramMap.subscribe(pm => {
      this.wikipediaUrl = `https://en.wikipedia.org/wiki/${pm.get('wikiId')}`;
    });
    this.dataSub = this.activateRoute.data
      .pipe(debounceTime(100))
      .subscribe(({ content: {data: content, error} }: { content: {data: IContent, error: any} }) => {
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
  }
  ngAfterViewInit() {}

  ngOnDestroy() {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }
}
