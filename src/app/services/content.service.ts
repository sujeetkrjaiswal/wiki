import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

export interface IContent {
  title: string;
  pageId: string;
  text: string;
}

export interface ISearchResponse {
  title: string;
  description: string;
  thumbnail?: {
    source: string,
    width: string,
    height: string,
  };
  url?: string;
}

const WIKI_BASE = 'https://en.wikipedia.org/wiki/';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(
    private store: AngularFirestore,
    private http: HttpClient
  ) {
  }

  search(query: string): Observable<ISearchResponse[]> {
    const urlQueryParams = new URLSearchParams({
      action: 'query',
      format: 'json',
      generator: 'prefixsearch',
      prop: 'pageprops|pageimages|description',
      redirects: '',
      ppprop: 'displaytitle',
      piprop: 'thumbnail',
      pithumbsize: '160',
      pilimit: '6',
      gpssearch: query,
      gpsnamespace: '0',
      gpslimit: '6'
    });
    const url = `https://en.wikipedia.org/w/api.php?${urlQueryParams.toString()}`;
    return this.http.jsonp<{
      query: { pages: { [id: string]: ISearchResponse } }
    }>(url, 'callback').pipe(
      map(res => {
        if (res && res.query && res.query.pages) {
          const results = (Object.values(res.query.pages) || []).filter(page => !!page).map((page: any) => ({
            title: page.title,
            description: page.description,
            thumbnail: page.thumbnail
          }));
          return results;
        }
      })
    );
  }

  openSearch(query: string): Observable<ISearchResponse[]> {
    if (!query) {
      return of([]);
    }
    const urlQueryParams = new URLSearchParams({
      action: 'opensearch',
      format: 'json',
      formatversion: '2',
      search: query,
      namespace: '0',
      limit: '10',
      suggest: 'true'
    });
    const url = `https://en.wikipedia.org/w/api.php?${urlQueryParams.toString()}`;

    return this.http.jsonp<[string, string[], string[], string[]]>(url, 'callback')
      .pipe(map((res): ISearchResponse[] => {
        const [_, titles, descriptions, urls] = res;
        if (
          Array.isArray(titles) &&
          Array.isArray(descriptions) &&
          Array.isArray(urls) &&
          titles.length === descriptions.length &&
          titles.length === urls.length
        ) {
          const results = titles.map((title, idx) => ({
            title,
            description: descriptions[idx],
            url: urls[idx]
          }));
          return results;
        } else {
          return [];
        }
      }));
  }

  getContent(pageId: string): Observable<IContent> {
    const urlQueryParams = new URLSearchParams({
      action: 'parse',
      prop: 'text',
      format: 'json',
      page: pageId
    });
    const url = `https://en.wikipedia.org/w/api.php?${urlQueryParams.toString()}`;
    return this.http.jsonp<{
      parse: { title: string, pageId: string, text: { '*': string } }
    }>(url, 'callback').pipe(
      map(res => ({
        title: res.parse.title,
        pageId: res.parse.pageId,
        text: res.parse.text['*']
      }))
    );
  }

  getID(url: string) {
    return url.substring(WIKI_BASE.length);
  }

}
