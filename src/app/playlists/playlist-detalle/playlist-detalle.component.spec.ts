import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDetalleComponent } from './playlist-detalle.component';

describe('PlaylistDetalleComponent', () => {
  let component: PlaylistDetalleComponent;
  let fixture: ComponentFixture<PlaylistDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistDetalleComponent]
    });
    fixture = TestBed.createComponent(PlaylistDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
