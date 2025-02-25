import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '../../@types/breadCrumb';
import { BreadCrumbService } from '../../services/bread-crumb.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  imports: [CommonModule, RouterLink, TranslatePipe],
})
export class BreadcrumbComponent {
  breadcrumbs: Array<Breadcrumb> = new Array<Breadcrumb>();

  constructor(private breadcrumbService: BreadCrumbService) {
    this.breadcrumbService.breadcrumbSubject$.subscribe({
      next: (breadcrumb) => {
        this.breadcrumbs = breadcrumb;
      },
    });
  }
}
