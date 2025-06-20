import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAbilitiesCardComponent } from './hero-abilities-card.component';

describe('HeroAbilitiesCardComponent', () => {
  let component: HeroAbilitiesCardComponent;
  let fixture: ComponentFixture<HeroAbilitiesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroAbilitiesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroAbilitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
