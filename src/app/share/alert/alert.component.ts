import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
	@ViewChild('alert', { static: false }) alert!: NgbAlert;

  @Input() alertStatus: boolean = false;
  @Input() alertType!: string;
  @Input() alertText!: string;

  open(status: boolean, type: string, text: string) {
    this.alertStatus = status;
    this.alertType = type;
    this.alertText = text;
  }

  @Output() onClose = new EventEmitter<any>();
}
