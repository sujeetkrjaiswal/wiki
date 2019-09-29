import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';

@Injectable({
  providedIn: 'root'
})
export class ContentResolver implements Resolve<any> {
  constructor(private contentSvc: ContentService) { }
  resolve(route: ActivatedRouteSnapshot) {
    const contentId = route.paramMap.get('wikiId');
    return this.contentSvc.getContent(contentId);
  }
}
