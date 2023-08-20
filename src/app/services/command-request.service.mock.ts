import {CommandRequestService} from './command-request.service';

export class CommandRequestServiceMock extends CommandRequestService {

  sendAlarmEcuSet(state: number): void {
  }

  sendAlarmEcuToggle(): void {
  }

  sendGateEcuSet(state: number) {
  }

  sendGateEcuToggle(): void {
  }

  sendGateStopToggle() {
  }
}
