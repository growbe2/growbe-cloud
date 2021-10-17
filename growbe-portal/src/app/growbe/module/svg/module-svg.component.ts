import { ChangeDetectionStrategy, Component, Input } from "@angular/core";


@Component({
  template: `
    <ng-container [ngSwitch]="moduleId?.slice(0,3)">
      <app-soil-module *ngSwitchCase="'AAS'" [mainboardId]="mainboardId" [moduleId]="moduleId"></app-soil-module>
      <app-thl-module *ngSwitchCase="'AAA'" [mainboardId]="mainboardId" [moduleId]="moduleId"></app-thl-module>
      <app-wc-module *ngSwitchDefault [mainboardId]="mainboardId" [moduleId]="moduleId"></app-wc-module>
    </ng-container>
  `,
})
export class ModuleSVGComponent {
  @Input() mainboardId: string;
  @Input() moduleId: string;
}
