import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Breadcrumb } from '../@types/breadCrumb';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const breadcrumbs = this.buildBreadcrumbs();
        this.breadcrumbsSubject.next(breadcrumbs);
      });
  }

  private buildBreadcrumbs(): Breadcrumb[] {
    let currentRoute: ActivatedRoute | null = this.activatedRoute.root;
    let breadcrumbs: Breadcrumb[] = [];
    let url = '';

    while (currentRoute) {
      const children = currentRoute.children;

      currentRoute = null;

      console.log('antes: ', breadcrumbs);
      children.forEach((route) => {
        if (route.outlet === 'primary') {
          const routeData = route.snapshot.data;
          const routeUrl = route.snapshot.url.map((segment) => segment.path);

          if (routeUrl) url += `/${routeUrl}`;

          if (routeData['breadcrumb']) {
            routeData['breadcrumb'];
            breadcrumbs.push({
              label: routeData['breadcrumb'],
              url: url,
            });
          }
          console.log('depois: ', breadcrumbs);
          currentRoute = route;
        }
      });
    }

    return breadcrumbs;
  }

  updateLastBreadcrumb(newLabel: string) {
    const current = [...this.breadcrumbsSubject.value];
    console.log(current);
    if (current.length > 0) {
      current[current.length - 1].label = newLabel;
      this.breadcrumbsSubject.next(current);
    }
  }
}
