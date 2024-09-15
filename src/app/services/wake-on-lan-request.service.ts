import {Injectable} from '@angular/core';

@Injectable()
export abstract class WakeOnLanRequestService {

  abstract getRyzenUrl(): string;

  abstract getLuigiLenovoUrl(): string;
}
