import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevDiariesComponent } from './dev-diaries.component';

describe('DevDiariesComponent', () => {
  let component: DevDiariesComponent;
  let fixture: ComponentFixture<DevDiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevDiariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevDiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
