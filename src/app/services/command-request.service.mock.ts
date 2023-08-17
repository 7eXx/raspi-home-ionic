import {CommandRequestService} from './command-request.service';

export class CommandRequestServiceMock extends CommandRequestService {
  sendAlarmEcuSet(state: number): void {
  }

  sendAlarmEcuToggle(): void {
  }
}
