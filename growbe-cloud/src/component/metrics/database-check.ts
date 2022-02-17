
import { Application, inject, MixinTarget} from '@loopback/core';
import { DataSource } from '@loopback/repository';
import { HealthTags } from '@loopback/health';


export function DBHealthCheckProviderMixin<
  T extends MixinTarget<object>,
>(superClass: T) {

    class DBHealthCheck extends superClass {

        ds: DataSource;

        value() {
            return () => this.ds.ping();
        }
    }

    return DBHealthCheck;
}

export function addDBCheck(
    app: Application,
    dataSourceName: string,
) {

    class Check extends DBHealthCheckProviderMixin(Object) {
        constructor(
            @inject(`datasources.${dataSourceName}`) ds: DataSource,
        ) {
            super();
            this.ds = ds;
        }
    }

    app.bind(`health.${dataSourceName}`).toProvider(Check).tag(HealthTags.READY_CHECK);
}