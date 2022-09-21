import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  service,
} from '@loopback/core';
import {debounceTime, Observable, Subject} from 'rxjs';
import {GrowbeMainboardBindings} from '../../keys';
import {GrowbeStateService} from '../../services';


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
  async init(): Promise<void> {}

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    // Dont send event to trigger anything on MQTT but set the state the DISCONNECTED
    //await this.state.growbeService.mainboardRepository.updateAll({
    //  state: 'DISCONNECTED',
    //});
    this.subject.asObservable()
    .subscribe(id => {
      this.state.valideState(id).then(
        () => {},
        () => {},
      );
    });

    await this.state.onAppRestart();
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
