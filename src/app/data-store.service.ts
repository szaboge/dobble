import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Config} from './intefaces/config.interface';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  imageState = new BehaviorSubject<{ images: Array<string>, state: number }>({images: [], state: 1});
  configState = new BehaviorSubject<{ config: Config, state: number }>({config: null, state: 1});
  imageSources = new BehaviorSubject<Array<string>>([]);

  constructor() {
  }
}
