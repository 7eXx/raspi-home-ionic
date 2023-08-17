import {Observable} from 'rxjs';
import {Automation} from '../datastructures/automation.datastructure';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class HomeBrokerService {

  abstract isConnectedAsObservable(): Observable<boolean>;

  abstract getSystemStatusAsObservable(): Observable<Automation>;

  abstract getEcuAlarmAsObservable(): Observable<boolean>;

  abstract reconnect(): void;
}
