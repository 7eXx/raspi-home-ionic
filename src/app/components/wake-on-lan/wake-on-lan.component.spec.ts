import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WakeOnLanComponent } from './wake-on-lan.component';

describe('WakeOnLanComponent', () => {
  let component: WakeOnLanComponent;
  let fixture: ComponentFixture<WakeOnLanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeOnLanComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WakeOnLanComponent);
    component = fixture.componentInstance;
    component.apiUrl = '/api/test';
    component.title = 'title';
    component.btnText = 'Button text';

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
