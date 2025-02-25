import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Breadcrumb } from '../../@types/breadCrumb';
import { CommonModule } from '@angular/common';
import { LanguageSelector } from '../language-selector/language-selector.component';

@Component({
  selector: 'app-header-information',
  imports: [CommonModule],
  templateUrl: './header-information.component.html',
  styleUrl: './header-information.component.scss',
})
export class HeaderInformationComponent {
  @Input() movieTitle!: string;
  @Input() routes!: Breadcrumb[];
}
