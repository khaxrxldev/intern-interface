import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/share/modal/modal.component';

@Component({
  selector: 'app-submission-page',
  templateUrl: './submission-page.component.html',
  styleUrls: ['./submission-page.component.css']
})
export class SubmissionPageComponent {
  @ViewChild('modal') modal!: ModalComponent;

  onOpenModal(data: any) {
    console.log(data)
    this.modal.open(this.modal.childContent);
  }
}
