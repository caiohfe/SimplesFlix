import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsMovieComponent } from './card-details-movie.component';

describe('CardDetailsMovieComponent', () => {
  let component: CardDetailsMovieComponent;
  let fixture: ComponentFixture<CardDetailsMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetailsMovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDetailsMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
