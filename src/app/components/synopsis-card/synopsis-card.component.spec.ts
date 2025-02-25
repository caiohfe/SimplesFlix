import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisCardComponent } from './synopsis-card.component';

describe('SynopsisCardComponent', () => {
  let component: SynopsisCardComponent;
  let fixture: ComponentFixture<SynopsisCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SynopsisCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SynopsisCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
