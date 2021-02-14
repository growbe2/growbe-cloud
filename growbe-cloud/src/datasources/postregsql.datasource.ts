import { lifeCycleObserver, LifeCycleObserver, inject } from "@loopback/core";
import { juggler } from "@loopback/repository";

@lifeCycleObserver('datasource')
export class PostregsqlDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'postregsql';

  constructor(
    @inject('datasources.config.postregsql', {optional: false})
    dsConfig: object,
  ) {
    super(dsConfig);
  }
}