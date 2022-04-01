import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { unsubscriber } from '@berlingoqc/ngx-common';
import { Subscription, merge } from 'rxjs';
@Directive({})
@unsubscriber
export class BaseSVGModuleComponent {
    @Input() mainboardId: string;
    @Input() moduleId: string;

    @Input() data: any;
    @Input() isOutdated: boolean;
    @Input() connected: boolean;


    extraProperties: string[];

 }
