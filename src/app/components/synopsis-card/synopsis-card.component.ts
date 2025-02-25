import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-synopsis-card',
  imports: [TranslatePipe],
  templateUrl: './synopsis-card.component.html',
  styleUrl: './synopsis-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SynopsisCardComponent {
  @Input() sinopse!: string;
}
