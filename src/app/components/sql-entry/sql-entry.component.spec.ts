import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlEntryComponent } from './sql-entry.component';

describe('SqlEntryComponent', () => {
  let component: SqlEntryComponent;
  let fixture: ComponentFixture<SqlEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqlEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
