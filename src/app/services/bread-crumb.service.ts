import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Breadcrumb } from '../@types/breadCrumb';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  breadcrumbSubject$: Subject<Array<Breadcrumb>> = new Subject<
    Array<Breadcrumb>
  >();

  constructor() {}
}
