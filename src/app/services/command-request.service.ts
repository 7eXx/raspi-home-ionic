import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Commands} from '../datastructures/commands.model';

interface CommandRequest {
  command: string;
  state: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommandRequestService {

  constructor(private httpClient: HttpClient) {
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
