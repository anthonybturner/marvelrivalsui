import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBoardGridlistComponent } from './hero-board-gridlist.component';

describe('HeroBoardGridlistComponent', () => {
  let component: HeroBoardGridlistComponent;
  let fixture: ComponentFixture<HeroBoardGridlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBoardGridlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroBoardGridlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
