import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerosListComponent } from './heroes-list.component';

describe('HerosListComponent', () => {
  let component: HerosListComponent;
  let fixture: ComponentFixture<HerosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HerosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HerosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
