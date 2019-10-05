import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ContentService, IContent } from 'src/app/services/content.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentResolver implements Resolve<{error?: any, data?: IContent}> {
  constructor(private contentSvc: ContentService) { }
  resolve(route: ActivatedRouteSnapshot) {
    const contentId = route.paramMap.get('wikiId');
    return this.contentSvc.getContent(contentId).pipe(
      map(data => ({data, error: null})),
      catchError(error => {
        return of({error, data: null});
      }
    ));
  }
}
