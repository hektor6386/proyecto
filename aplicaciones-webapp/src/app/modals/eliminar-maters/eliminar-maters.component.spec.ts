import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarMatersComponent } from './eliminar-maters.component';

describe('EliminarMatersComponent', () => {
  let component: EliminarMatersComponent;
  let fixture: ComponentFixture<EliminarMatersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarMatersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarMatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
