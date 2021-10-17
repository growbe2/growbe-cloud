import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventParentScrollDirective } from './prevent-parent-scroll.directive';



@NgModule({
  declarations: [
    PreventParentScrollDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PreventParentScrollDirective,
  ]
})
export class HelpersModule { }
