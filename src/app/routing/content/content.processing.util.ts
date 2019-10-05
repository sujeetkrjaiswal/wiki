import * as $ from 'jquery';

export function parseContent(html: string): [HTMLElement, HTMLElement] {
  const sectionElem = document.createElement('section');
  const path = location.pathname;
  sectionElem.innerHTML = html;
  $(sectionElem).find('#References').parent().next().remove();
  $(sectionElem).find('#References').parent().remove();
  $(sectionElem).find('#External_links').parent().next().remove();
  $(sectionElem).find('#External_links').parent().remove();
  $(sectionElem).find('.mw-editsection').remove();
  $(sectionElem).find('.reference').remove();
  $(sectionElem).find('.navbox').remove();
  $(sectionElem).find('.noprint').remove();
  $(sectionElem).find('.reflist').remove();
  $(sectionElem).find('a[href^="#"]').attr('href', (i, href) => `${path}${href}`);

  const tocElem = $(sectionElem).find('#toc').detach()[0];

  return [tocElem, sectionElem];
}
