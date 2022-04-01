import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { GrowbeFileAPI } from "../api/growbe-files";


import pkg from '../../../../package.json';

function getRelease(type: string, items: any[]) {
  const els = items.filter(item => item.name.includes(type))
  return els.map((el) => {
    return {
      version: el.name.split('-')[2].replace(".md", ""),
      name: el.name
    }
  })
}


export const trimDevVersion = (version) => {
  return version.split('-')[0];
}

@Injectable({
  providedIn: 'root'
})
export class GrowbeReleaseService {

  constructor(
    private growbeFile: GrowbeFileAPI,
  ) {}

  getVersion() {
    return pkg.version;
  }

  getReleaseText(type: string, version: string) {
    return this.growbeFile.getFileContent('releases', `growbe-${type}-${version}.md`);
  }

  getReleases() {
    return this.growbeFile.getContainerFiles('releases').pipe(
      map((items: any[]) => {
        return {
          mainboard: getRelease('mainboard', items),
          cloud: getRelease('cloud', items),
        }
      })
    )
  }
}
