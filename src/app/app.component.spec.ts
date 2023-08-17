import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {HomeBrokerService} from "./services/home-broker.service";
import {HomeBrokerServiceMock} from "./services/home-broker.service.mock";
import {CommandRequestServiceMock} from "./services/command-request.service.mock";
import {CommandRequestService} from "./services/command-request.service";

describe('AppComponent', () => {

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: HomeBrokerService, useClass: HomeBrokerServiceMock },
        { provide: CommandRequestService, useClass: CommandRequestServiceMock },
      ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  // TODO: add more tests!

});
