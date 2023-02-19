import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {envConfig} from "@berlingoqc/ngx-common";



@Injectable()
export abstract class BaseAPI {
  get url(): string {
    return envConfig.growbeCloud;
  }

  constructor(
    protected httpClient: HttpClient,
  ) {}
}
