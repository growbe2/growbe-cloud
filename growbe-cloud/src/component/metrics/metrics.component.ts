import { Application, Component, CoreBindings, inject } from "@loopback/core";
import { LiveCheck, ReadyCheck, HealthComponent, HealthBindings, HealthTags} from '@loopback/health';
import {MetricsComponent} from '@loopback/metrics';
import { addDBCheck } from "./database-check";

export class GrowbeMetricsComponent implements Component {
  repositories: [];
  models: [];
  controllers = [];

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
  ) {

    this.app.component(MetricsComponent);
    this.app.component(HealthComponent);
    this.app.configure(HealthBindings.COMPONENT).to({
      healthPath: '/health',
      livePath: '/live',
      readyPath: '/ready'
    });


    addDBCheck(app, 'pgsql');
    addDBCheck(app, 'mongo')

    // REMPLACER PAR UN OBSERVER
    const myLiveCheck: LiveCheck = () => {
        return Promise.resolve();
    };
    const myReadyCheck: ReadyCheck = () => {
        return Promise.resolve();
    };
    app.bind('health.MyLiveCheck').to(myLiveCheck).tag(HealthTags.LIVE_CHECK);
    app.bind('health.MyReadyCheck').to(myReadyCheck).tag(HealthTags.READY_CHECK);
  }
}
