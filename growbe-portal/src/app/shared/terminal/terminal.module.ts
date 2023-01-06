import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal/terminal.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { DashboardModule } from '@growbe2/growbe-dashboard';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { HelpersModule } from 'src/app/helpers/helpers.module';

@NgModule({
    declarations: [TerminalComponent],
    imports: [
      CommonModule,
      MatIconModule,
      MatButtonModule,
      AutoFormModule,
      ScrollingModule,
      DashboardModule,
      HelpersModule,
    ],
    exports: [TerminalComponent],
})
export class TerminalModule {}
