import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  toastStatus: boolean = false;
  toastText!: string;
  toastAlertType!: string;
  toastTextColor!: string;

  open(text: string, type: string) {
    this.toastText = text;
    this.toastAlertType = 'alert-' + type;
    this.toastTextColor = 'text-' + type;
    this.toastStatus = true;
    
    setTimeout(() => (this.toastStatus = false), 10000);
  }

  close() {
    this.toastStatus = false
  }
}
