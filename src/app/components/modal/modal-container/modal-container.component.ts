import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-container',
  imports: [CommonModule],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss',
})
export class ModalContainerComponent {
  @Input() visivel: boolean = false;
  @Input() isAlert: boolean = false;
  @Output() visivelChange = new EventEmitter<boolean>();

  close() {
    this.visivel = !this.visivel;
    this.visivelChange.emit(this.visivel);
  }
}
