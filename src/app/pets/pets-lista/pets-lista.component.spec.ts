import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsListaComponent } from './pets-lista.component';

describe('PetsListaComponent', () => {
  let component: PetsListaComponent;
  let fixture: ComponentFixture<PetsListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetsListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
