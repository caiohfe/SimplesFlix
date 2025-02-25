import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { Breadcrumb } from '../../@types/breadCrumb';
import { BreadCrumbService } from '../../services/bread-crumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class BreadcrumbComponent {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcrumbService: BreadCrumbService) {}

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe((crumbs) => {
      this.breadcrumbs = crumbs;
    });
  }
}
