import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlarmPage } from './alarm-page.component';
import {HomeBrokerService} from '../services/home-broker.service';
import {HomeBrokerServiceMock} from '../services/home-broker.service.mock';
import {CommandRequestService} from '../services/command-request.service';
import {CommandRequestServiceMock} from '../services/command-request.service.mock';

describe('AlarmPage', () => {
  let component: AlarmPage;
  let fixture: ComponentFixture<AlarmPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HomeBrokerService, useClass: HomeBrokerServiceMock },
        { provide: CommandRequestService, useClass: CommandRequestServiceMock }
      ],
      declarations: [AlarmPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlarmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
