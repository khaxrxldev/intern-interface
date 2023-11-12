import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inline-overflow-element',
  templateUrl: './inline-overflow-element.component.html',
  styleUrls: ['./inline-overflow-element.component.css']
})
export class InlineOverflowElementComponent implements OnInit, AfterViewInit {
  stringArr: string[] = ['1','2','3','4','5','6','7','1','2','3','4','5','6','7'];

  itemContainerWidth!: number;
  ngOnInit(): void {
    document.getElementById('scroll-container')!.addEventListener("scroll", () => {}); 
  }

  ngAfterViewInit(): void {
    let itemContainer = Array.from(document.getElementsByClassName('grid-item'))[0] as HTMLDivElement;
    this.itemContainerWidth = itemContainer.clientWidth + 2;
  }

  scrollToContent(contentId: number) {
    document.getElementById(contentId.toString())!.scrollIntoView({ behavior: 'smooth' });
  }

  scrollContentIncrement() {
    let scrollContainer = document.getElementById('scroll-container') as HTMLDivElement;
    let current = (scrollContainer.clientWidth + scrollContainer.scrollLeft) / this.itemContainerWidth;
    let round = Math.round(current);
    let floor = Math.floor(current);
    let ceil = Math.ceil(current);
    
    if (current < (floor + 0.5)) {
      this.scrollToContent(floor);
    } else {
      this.scrollToContent(ceil);
    }
  }
  
  scrollContentDecrement() {
    let scrollContainer = document.getElementById('scroll-container') as HTMLDivElement;
    if (Number.isInteger(scrollContainer.scrollLeft / this.itemContainerWidth)) {
      this.scrollToContent(Math.round(scrollContainer.scrollLeft / this.itemContainerWidth) - 1);
    } else {
      this.scrollToContent(Math.floor(scrollContainer.scrollLeft / this.itemContainerWidth));
    }
  }
}
