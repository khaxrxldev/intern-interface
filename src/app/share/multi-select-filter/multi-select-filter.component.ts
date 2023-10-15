import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionContent } from 'src/app/model/OptionContent';

@Component({
  selector: 'app-multi-select-filter',
  templateUrl: './multi-select-filter.component.html',
  styleUrls: ['./multi-select-filter.component.css']
})
export class MultiSelectFilterComponent implements OnInit {
  @Input() options: OptionContent[] = [];
  @Input() checkedValues: string[] = [];

  @Output() onPassCheckedValue = new EventEmitter<any>();

  filterOptions: OptionContent[] = [];
  selectContent: boolean = false;
  checkedIds!: string[];

  ngOnInit() {
    let body = document.getElementsByTagName("body")[0] as HTMLBodyElement;

    body.addEventListener('click', (pointer: any) => {
      let className: string = pointer.target.className;
      
      if (!(className.includes('select-input') || className.includes('select-icon') || className.includes('select-option') || className.includes('select-checkbox') || className.includes('select-text'))) {
        this.selectContent = false;
      }
    });
  }

  saveChecked(event: any) {
    if (this.checkedValues) {
      this.checkedIds = this.checkedValues;
    } else {
      this.checkedIds = [];
    }

    if (event.target.checked) {
      this.checkedIds.push(event.target.value);
    } else {
      this.checkedIds = this.checkedIds.filter(item => item !== event.target.value)
    }

    this.onPassCheckedValue.emit(this.checkedIds);
  }

  setFilterOptions(evt: any) {
    while (this.filterOptions.length > 0) {
      this.filterOptions.pop();
    }

    if (evt.target.value) {
      this.options.forEach((optionData: OptionContent) => {
        if (optionData.text.indexOf(evt.target.value) > -1) {
          this.filterOptions.push(optionData);
        }
      });
    } else {
      this.options.forEach((optionData: OptionContent) => {
        this.filterOptions.push(optionData);
      });
    }
  }
}
