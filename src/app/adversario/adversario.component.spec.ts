import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdversarioComponent } from './adversario.component';

describe('AdversarioComponent', () => {
  let component: AdversarioComponent;
  let fixture: ComponentFixture<AdversarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdversarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdversarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
