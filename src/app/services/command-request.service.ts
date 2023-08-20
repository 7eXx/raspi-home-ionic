import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Commands} from '../datastructures/commands.model';

export interface CommandRequest {
  command: string;
  state?: number;
}

@Injectable()
export abstract class CommandRequestService {

  abstract sendAlarmEcuToggle(): void;

  abstract sendAlarmEcuSet(state: number): void;

  abstract sendGateEcuToggle(): void;

  abstract sendGateEcuSet(state: number);

  abstract sendGateStopToggle();
}
