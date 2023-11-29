import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMatersComponent } from './editar-maters.component';

describe('EditarMatersComponent', () => {
  let component: EditarMatersComponent;
  let fixture: ComponentFixture<EditarMatersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMatersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarMatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
