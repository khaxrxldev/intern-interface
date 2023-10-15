import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustHTML'
})
export class TrustHTMLPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(unsafeHTML: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(unsafeHTML);
  }
}
