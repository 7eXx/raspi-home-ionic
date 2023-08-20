import {HomeBrokerService} from './home-broker.service';
import {Observable, of} from 'rxjs';
import {Automation} from '../datastructures/automation.datastructure';

export class HomeBrokerServiceMock extends HomeBrokerService {

  getSystemStatusAsObservable(): Observable<Automation> {
    return of(null);
  }

  isConnectedAsObservable(): Observable<boolean> {
    return of(true);
  }

  getEcuAlarmAsObservable(): Observable<boolean> {
    return of(false);
  }

  isSystemStatusAvailableAsObservable(): Observable<boolean> {
    return of(true);
  }

  getGateAsObservable(): Observable<boolean> {
    return of(true);
  }

  reconnect(): void {
  }

}
