import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@berlingoqc/ngx-common';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GrowbeReleaseService, trimDevVersion } from 'src/app/growbe/services/growbe-releases.service';

@Component({
  selector: 'app-release-note',
  templateUrl: './release-note.component.html',
  styleUrls: ['./release-note.component.scss']
})
export class ReleaseNoteComponent extends OnDestroyMixin(Object) implements OnInit {


  text$: Observable<string>;

  constructor(
    private releaseService: GrowbeReleaseService,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.text$ = combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.data,
    ]).pipe(
      switchMap(([params, data]) => {
      let version: string = '';
      let type: string = '';
      if (data.current) {
        version = trimDevVersion(this.releaseService.getVersion());
        type = 'cloud';
      } else {
        type = params.type;
        version = params.version;
      }
      return this.releaseService.getReleaseText(type, version);
    }));
  }

}
