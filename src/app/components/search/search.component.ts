import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObservableSearchService } from '../../services/search.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  search: string = '';

  constructor(private observerService: ObservableSearchService) {}

  searched(): void {
    this.observerService.outputSearchedValue(this.search);
  }
}
