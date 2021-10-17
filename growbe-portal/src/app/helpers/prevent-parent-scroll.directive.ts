import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPreventParentScroll]'
})
export class PreventParentScrollDirective {

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) {
    elementRef.nativeElement.onwheel = (event) => {
      event.preventDefault()
      event.returnValue = null;
      this.elementRef.nativeElement.scrollTop += event.deltaY;
    }
  }

}
