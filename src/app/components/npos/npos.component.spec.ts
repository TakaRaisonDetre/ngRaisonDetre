/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NposComponent } from './npos.component';

describe('NposComponent', () => {
  let component: NposComponent;
  let fixture: ComponentFixture<NposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
