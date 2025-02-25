import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent implements OnInit {
  @Input() label!: string | null;
  @Input() icon: string = '';
  @Input() isLargeBadge: boolean = false;
  @Input() isSmallBadge: boolean = false;
  @Input() isTextHighlighted: boolean = false;
  @Input() moreThanThree: boolean = false;
  widthIcon: string = '10';
  heightIcon: string = '10';
  @Input() sizeIcon!: string;

  sizeIconFormat(value: string): void {
    this.widthIcon = value;
    this.heightIcon = value;
  }

  ngOnInit(): void {
    this.sizeIconFormat(this.sizeIcon);
  }
}
