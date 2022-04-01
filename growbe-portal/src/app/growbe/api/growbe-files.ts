import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { envConfig } from "@berlingoqc/ngx-common";

@Injectable({
  providedIn: 'root'
})
export class GrowbeFileAPI {

  get url() {
    return `${envConfig.growbeCloud}/containers/`;
  }

  constructor(
    private http: HttpClient,
  ) {}

  getContainers() {
    return this.http.get(`${this.url}`);
  }

  getContainerFiles(container: string) {
    return this.http.get(`${this.url}/${container}/files`)
  }

  getFileContent(container: string, file: string) {
    return this.http.get(`${this.url}/${container}/download/${file}`, { responseType: 'text' })
  }
}
