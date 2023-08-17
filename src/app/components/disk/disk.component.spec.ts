import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiskComponent } from './disk.component';

describe('DiskComponent', () => {
  let component: DiskComponent;
  let fixture: ComponentFixture<DiskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DiskComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiskComponent);

    component = fixture.componentInstance;
    component.disk = {
      total: 500,
      used:  250,
      free: 250,
      percentage: 50,
      unit: 'GB'
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
