import { Component, Input } from '@angular/core';
import { AccordianContent } from 'src/app/model/AccordianContent';

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.css']
})
export class AccordianComponent {
  @Input() accordianContents!: AccordianContent[];
}
