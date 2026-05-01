import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnprinciComponent } from './anprinci';

describe('AnprinciComponent', () => {
  let component: AnprinciComponent;
  let fixture: ComponentFixture<AnprinciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnprinciComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AnprinciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
