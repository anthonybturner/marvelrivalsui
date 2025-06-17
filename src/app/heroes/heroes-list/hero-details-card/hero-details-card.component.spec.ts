import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailsCardComponent } from './hero-details-card.component';

describe('HeroDetailsCardComponent', () => {
  let component: HeroDetailsCardComponent;
  let fixture: ComponentFixture<HeroDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDetailsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
