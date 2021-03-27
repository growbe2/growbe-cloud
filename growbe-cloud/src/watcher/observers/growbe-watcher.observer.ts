import {
  Application,
    BindingScope,
  CoreBindings,
  inject,
  injectable,
  /* inject, Application, CoreBindings, */
  lifeCycleObserver,
  LifeCycleObserver,
  service,
} from '@loopback/core';
import mqtt from 'mqtt';
import { Subject } from 'rxjs';
import {GrowbeMainboardBindings} from '../../keys';
import { GrowbeStateService } from '../../services';
import {DataSubject} from './model';


@lifeCycleObserver('')
export class GrowbeStateWatcherObserver implements LifeCycleObserver {

  constructor(
    @service(GrowbeStateService)
    private state: GrowbeStateService,
    @inject(GrowbeMainboardBindings.WATCHER_STATE_EVENT)
    private subject: Subject<string>,
  ) {}

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
      this.subject.asObservable().subscribe((id) => {
          this.state.valideState(id)
      });
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }

}
