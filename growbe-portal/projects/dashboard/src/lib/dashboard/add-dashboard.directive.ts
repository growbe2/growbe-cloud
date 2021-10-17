import { Directive, ElementRef, HostListener, Inject, Input, Optional } from "@angular/core";
import { AutoFormDialogService } from "@berlingoqc/ngx-autoform";
import { DashboardItem, DASHBOARD_ITEM_REF } from "./dashboard.model";
import { BehaviorSubject } from "rxjs";
import { getCopyDashboardForm } from "./dashboard.form";
import { DashboardService } from './dashboard.service';


@Directive({
  selector: '[addToDashboard]'
})
export class AddToDashboardDirective {

  @Input() dashboardItem: DashboardItem;

  @HostListener('click')
  onClick(event: Event) {
    const form = getCopyDashboardForm(
      this.dashboardService,
      new BehaviorSubject([]),
      { ...this.dashboardItem},
    )

    this.formDialogService.open(form);
  }

  constructor(
    @Optional() @Inject(DASHBOARD_ITEM_REF) refDashboardItem: DashboardItem,
    private dashboardService: DashboardService,
    private formDialogService: AutoFormDialogService,
    private ref: ElementRef<HTMLElement>
  ) {
    if (refDashboardItem)
      this.ref.nativeElement.style.display = 'none'
  }
}
