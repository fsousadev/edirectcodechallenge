import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertTaskDialogComponent } from './upsert-task-dialog.component';

describe('UpsertTaskDialogComponent', () => {
  let component: UpsertTaskDialogComponent;
  let fixture: ComponentFixture<UpsertTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsertTaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
