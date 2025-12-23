import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMapsComponent } from './game-maps.component';

describe('GameMapsComponent', () => {
  let component: GameMapsComponent;
  let fixture: ComponentFixture<GameMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameMapsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
