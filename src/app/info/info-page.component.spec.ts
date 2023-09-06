import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoPage } from './info-page.component';
import {HomeBrokerService} from "../services/home-broker.service";
import {HomeBrokerServiceMock} from "../services/home-broker.service.mock";
import {RouterTestingModule} from "@angular/router/testing";

describe('InfoPage', () => {
  let component: InfoPage;
  let fixture: ComponentFixture<InfoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HomeBrokerService, useClass: HomeBrokerServiceMock}
      ],
      declarations: [InfoPage],
      imports: [
        RouterTestingModule,
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
