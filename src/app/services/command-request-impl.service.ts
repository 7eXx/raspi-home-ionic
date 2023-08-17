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

  public sendAlarmEcuToggle() {
    this.sendCommand(Commands.ALARM_ECU_TOGGLE);
  }

  public sendAlarmEcuSet(state: number) {
    this.sendCommand(Commands.ALARM_ECU_SET, state);
  }

  private sendCommand(command: string, status?: number) {
    const commandRequest: CommandRequest = {
      command: command,
      state: status
    };
    this.httpClient.put(this.getCommandUrl(), commandRequest).subscribe();
  }

  private getCommandUrl() {
    return `http://${environment.flask.server}:${environment.flask.port}/command`;
  }
}
