import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppUtilityService } from 'src/app/service/app-utility.service';

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.css']
})
export class SearchSelectComponent implements OnInit {
  @Input() options: string[] = [];
  @Input() formGroup!: FormGroup;
  @Input() formGroupId!: string;
  @Input() formControlString!: string;
  @Input() formGroupError!: boolean;

  filterOptions: string[] = [];
  selectContent: boolean = false;

  constructor(public appUtilityService: AppUtilityService) {}

  ngOnInit() {
    let body = document.getElementsByTagName("body")[0] as HTMLBodyElement;

    body.addEventListener('click', (pointer: any) => {
      let className: string = pointer.target.className;
      
      if (!(className.includes('select-input') || className.includes('select-icon') || className.includes('select-option'))) {
        this.selectContent = false;
      }
    });
  }

  setFilterOptions(evt: any) {
    while (this.filterOptions.length > 0) {
      this.filterOptions.pop();
    }

    if (evt.target.value) {
      this.options.forEach((option: string) => {
        if (option.indexOf(evt.target.value) > -1) {
          this.filterOptions.push(option);
        }
      });
    } else {
      this.options.forEach((option: string) => {
        this.filterOptions.push(option);
      });
    }
  }

  setInputValue(evt: any) {
    let searchInput = document.getElementById(this.formGroupId) as HTMLInputElement;
    searchInput.value = evt.target.innerHTML;
    this.formGroup.controls[this.formControlString].setValue(searchInput.value);
    this.selectContent = false;
  }
}
