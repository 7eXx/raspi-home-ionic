import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GatePage } from './gate-page.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('GatePage', () => {
  let component: GatePage;
  let fixture: ComponentFixture<GatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GatePage],
      imports: [RouterTestingModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
