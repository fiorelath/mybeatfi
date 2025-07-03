import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistFormComponent } from './playlist-form.component';

describe('PlaylistFormComponent', () => {
  let component: PlaylistFormComponent;
  let fixture: ComponentFixture<PlaylistFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistFormComponent]
    });
    fixture = TestBed.createComponent(PlaylistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
