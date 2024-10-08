import {environment} from '../../environments/environment';
import {WakeOnLanRequestService} from './wake-on-lan-request.service';

export class WakeOnLanRequestServiceImpl extends WakeOnLanRequestService {

  getRyzenUrl(): string {
    return `${environment.apiServerUrl}/wake_ryzen`;
  }

  getLuigiLenovoUrl(): string {
    return `${environment.apiServerUrl}/wake_lenovo`;
  }
}
