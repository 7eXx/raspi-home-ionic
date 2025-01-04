import {CommandRequestService} from './command-request.service';

export class CommandRequestServiceMock extends CommandRequestService {

  override sendAlarmEcuSet(state: number): void {
  }

  override sendAlarmEcuToggle(): void {
  }

  override sendGateEcuSet(state: number) {
  }

  override sendGateEcuToggle(): void {
  }

  override sendGateStopToggle() {
  }

  override sendHomeAwayModeToggle() {
  }
}
