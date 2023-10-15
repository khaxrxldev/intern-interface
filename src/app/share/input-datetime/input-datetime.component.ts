import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-datetime',
  templateUrl: './input-datetime.component.html',
  styleUrls: ['./input-datetime.component.css']
})
export class InputDatetimeComponent implements OnInit {
  @Input() inputId!: string;
  @Input() inputMin!: number;
  @Input() inputMax!: number;
  @Input() inputType: string = '';
  @Input() inputValue: string = '';
  @Input() inputDisable: boolean = false;
  @Input() inputPlaceholder: string = '';
  @Input() inputBorderRadius: string = 'bdr-rad-mdl';
  @Input() inputInvalidStatus: string = '';
  
  @Input() optionParam!: number[];
  optionArray: string[] = [];
  input!: HTMLInputElement;
  selectContentStatus: boolean = false;

  ngOnInit() {
    let body = document.getElementsByTagName("body")[0] as HTMLBodyElement;

    body.addEventListener('click', (e: any) => {
      if (e.target.id !== this.inputId) {
        this.selectContentStatus = false;
      }
    });

    if (this.optionParam) {
      this.setSelectOption(this.optionParam[0], this.optionParam[1], this.optionParam[2]);
    }
  }

  setInputValue(value: string) {
    this.inputValue = value.toString();
  }

  getInputValue() {
    return this.inputValue;
  }

  setSelectOption(start: number, end: number, step: number) {
    let options: number [] = Array.from({ length: (end - start) / step + 1 }, (_, i) => start + i * step);
    options.forEach((option: number) => {
      this.optionArray.push(String(option).padStart(2, '0'));
    });
  }
}
