import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertProjectDialogComponent } from './upsert-project-dialog.component';

describe('UpsertProjectDialogComponent', () => {
  let component: UpsertProjectDialogComponent;
  let fixture: ComponentFixture<UpsertProjectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsertProjectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
