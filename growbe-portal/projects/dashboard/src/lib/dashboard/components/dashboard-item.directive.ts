import { Directive, Input } from "@angular/core";




@Directive()
export class DashboardItemDirective {

  // if static the item can't be modify or deleted
  @Input() static?: boolean;

}
