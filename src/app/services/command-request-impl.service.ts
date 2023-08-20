import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Commands} from '../datastructures/commands.model';
import {environment} from '../../environments/environment';
import {CommandRequest, CommandRequestService} from './command-request.service';

@Injectable()
export class CommandRequestServiceImpl extends CommandRequestService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public override sendAlarmEcuToggle() {
    this.sendCommand(Commands.ALARM_ECU_TOGGLE);
  }

  public override sendAlarmEcuSet(state: number) {
    this.sendCommand(Commands.ALARM_ECU_SET, state);
  }

  public override sendGateEcuToggle() {
    this.sendCommand(Commands.GATE_ECU_TOGGLE);
  }

  public override sendGateEcuSet(state: number) {
    this.sendCommand(Commands.GATE_STOP_TOGGLE, state);
  }

  public override sendGateStopToggle() {
    this.sendCommand(Commands.GATE_STOP_TOGGLE);
  }

  private sendCommand(command: string, status?: number) {
    const commandRequest: CommandRequest = (status !== undefined)
      ? {command: command, state: status}
      : {command: command};
    this.httpClient.put(this.getCommandUrl(), commandRequest).subscribe();
  }

  private getCommandUrl() {
    return `http://${environment.flask.server}:${environment.flask.port}/command`;
  }
}
