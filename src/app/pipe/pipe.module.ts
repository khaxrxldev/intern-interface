import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustHTMLPipe } from './trust-html.pipe';

@NgModule({
  declarations: [
    TrustHTMLPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrustHTMLPipe
  ]
})
export class PipeModule { }
