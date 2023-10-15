import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.css']
})
export class ButtonGroupComponent {
  @Output() onClick = new EventEmitter<any>();
  
  @Input() btnTxt: string = '';
  @Input() btnIcn: string = '';
  @Input() btnType: string = '';
  @Input() btnSize: string = 'input-group-sm';

  @Input() btnContentColor: string = '';
  @Input() btnBgClass: string = '';
  @Input() btnBorderClass: string = '';
  @Input() disabledStatus: boolean = false;

  onClickBtn() {
    this.onClick.emit();
  }
}
