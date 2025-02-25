import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { LanguageSelector } from '../language-selector/language-selector.component';
import { BreadCrumbService } from '../../services/bread-crumb.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SideBarComponent,
    BreadcrumbComponent,
    LanguageSelector,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  // constructor(
  //   private route: ActivatedRoute,
  //   private breadcrumbService: BreadCrumbService
  // ) {}
  // ngOnInit() {
  //   this.route.firstChild?.data.subscribe((data) => {
  //     this.breadcrumbService.setBreadcrumbs(data['breadcrumb'] || []);
  //   });
  // }
}
