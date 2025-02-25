import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-button',
  imports: [CommonModule],
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.scss',
})
export class CommonButtonComponent {
  @Input() label!: string;
  @Input() icon: string = '';
  @Input() type: string = '';
  @Input() isDisable: boolean = false;
  @Input() colorWhite: boolean = false;
  @Input() action!: () => void;
}
