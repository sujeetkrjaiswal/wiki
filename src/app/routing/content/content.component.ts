import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IContent } from 'src/app/services/content.service';
import { Subscription } from 'rxjs';
import { parseContent } from './content.processing.util';

@Component({
  selector: 'wiki-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('htmlPlaceholder', { static: true }) htmlPlaceholder: ElementRef<HTMLElement>;
  @ViewChild('tocPlaceholder', { static: true }) tocPlaceholder: ElementRef<HTMLElement>;

  tocOpened = false;
  title = '';
  html = '';
  private dataSub: Subscription | null = null;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.dataSub = this.activateRoute.data.subscribe(({ content }: { content: IContent }) => {
      this.title = content.title;
      this.html = content.text;
      setTimeout(() => {
        const [toc, content] = parseContent(this.html);
        this.htmlPlaceholder.nativeElement.innerHTML = '';
        this.htmlPlaceholder.nativeElement.appendChild(content);
        this.tocPlaceholder.nativeElement.innerHTML = '';
        this.tocPlaceholder.nativeElement.appendChild(toc);
      }, 100);

    });
  }
  ngAfterViewInit() {

  }

  ngOnDestroy() {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
  }

}
