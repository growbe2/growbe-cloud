import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal/terminal.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';

@NgModule({
    declarations: [TerminalComponent],
    imports: [
      CommonModule,
      AutoFormModule,
      ScrollingModule,
    ],
    exports: [TerminalComponent],
})
export class TerminalModule {}
