import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GrowbeReleaseService } from 'src/app/growbe/services/growbe-releases.service';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {

  items$: Observable<any>;

  constructor(
    private releaseService: GrowbeReleaseService,
  ) { }

  ngOnInit(): void {
    this.items$ = this.releaseService.getReleases();
  }


}
