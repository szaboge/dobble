import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Config} from './intefaces/config.interface';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  stateConfigurator = new BehaviorSubject<number>(1);
  stateImageChooser = new BehaviorSubject<number>(1);
  config = new BehaviorSubject<Config>(null);
  images = new BehaviorSubject<Array<string>>([]);

  constructor() {
  }
}
