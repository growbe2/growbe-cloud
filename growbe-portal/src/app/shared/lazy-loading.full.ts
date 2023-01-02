import {CommonModule} from "@angular/common";
import {AfterContentChecked, Component, ContentChild, ElementRef, NgModule, TemplateRef} from "@angular/core";

@Component({
  selector: 'lazy-load-container',
  template: `
  <ng-container></ng-container>
  <ng-container [ngTemplateOutlet]="contentTemplate" *ngIf="loadContent"></ng-container>
  `,
})
export class LazyLoadContainerComponent implements AfterContentChecked {
  constructor(private elRef: ElementRef) {}

  @ContentChild('body', { static: true })
  contentTemplate: TemplateRef<ElementRef>;

  loadContent: boolean;
  ngAfterContentChecked() {
    if (this.elRef.nativeElement.offsetParent) this.loadContent = true;
  }
}


@NgModule({
  imports: [CommonModule],
  declarations: [LazyLoadContainerComponent],
  exports: [LazyLoadContainerComponent],
})
export class LazyLoadingModule {

}
