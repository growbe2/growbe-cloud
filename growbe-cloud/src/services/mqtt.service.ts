import {injectable,inject, BindingScope} from '@loopback/core';
import {Observable} from 'rxjs';
import { mqttObservable } from '../helpers';
import { MQTTBindings } from '../keys';

@injectable({scope: BindingScope.SINGLETON})
export class MQTTService {
  observable: Observable<any>;

  constructor(
      @inject(MQTTBindings.URL)
      url: string
  ) {
      this.observable = mqttObservable(url);
  }

}
