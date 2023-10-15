import { Component, Input, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() headerDisplayStatus: boolean = true;
  @Input() footerDisplayStatus: boolean = true;
  @Input() modalSize: string = 'md';
  @Input() scrollable: boolean = false;
  @Input() closeButtonDisplayStatus: boolean = true;

	constructor(private ngbModalConfig: NgbModalConfig, private modalService: NgbModal) {
    ngbModalConfig.backdrop = 'static';
		ngbModalConfig.keyboard = false;
  }

  @ViewChild('content') childContent!: any;

	open(content: any) {
		this.modalService.open(content, { size: this.modalSize, scrollable: this.scrollable });
	}

  close() {
    this.modalService.dismissAll();
  }
}
