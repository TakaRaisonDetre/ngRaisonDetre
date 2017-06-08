/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddNpoComponent } from './add-npo.component';

describe('AddNpoComponent', () => {
  let component: AddNpoComponent;
  let fixture: ComponentFixture<AddNpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
