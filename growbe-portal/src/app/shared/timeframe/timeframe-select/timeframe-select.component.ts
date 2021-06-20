// eslint-disable @typescript-eslint/member-ordering
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutoFormComponent, AutoFormData } from '@berlingoqc/ngx-autoform';
import { of } from 'rxjs';

export const timeFieldComponent = {
    name: 'multipart',
    objects: {
        hours: {
            size: 2,
            validators: [
                (control: FormControl) => {
                    const hours = +control.value;
                    if (hours > 23) {
                        return { hours: true };
                    }
                    return null;
                },
            ],
        },
        minutes: {
            size: 2,
            validators: [
                (control: FormControl) => {
                    const minutes = +control.value;
                    if (minutes > 59) {
                        return { minutes: true };
                    }
                    return null;
                },
            ],
        },
    },
    spacers: [
        {
            type: 'string',
            content: ':',
        },
    ],
    transformer: {
        reconstruct: (time: any) => {
            if (time) {
                return Object.values(time).join(':');
            }
            return '';
        },
        transform: (time: string) => {
            if (time) {
                const split = time.split(':');
                return {
                    hours: split[0],
                    minutes: split[1],
                };
            }
            return { hours: '', minutes: '' };
        },
    },
    //validators: [Validators.pattern('^[0-9]*$')],
};

@Component({
    selector: 'app-timeframe-select',
    templateUrl: './timeframe-select.component.html',
    styleUrls: ['./timeframe-select.component.scss'],
})
export class TimeframeSelectComponent implements OnInit {
    @Output() timeSelected = new EventEmitter<any>();

    @Input() interval: any;

    tabIndex = 0;
    presets = [
        {
            unit: 'Minutes',
            lastX: 30,
            text: 'Last 30 minutes',
        },
        {
            unit: 'Hours',
            lastX: 1,
            text: 'Last Hour',
        },
        {
            unit: 'Date',
            lastX: 1,
            text: 'Last Day',
        },
        {
            unit: 'Date',
            lastX: 7,
            text: 'Last Week',
        },
        {
            unit: 'Month',
            lastX: 1,
            text: 'Last Month',
        },
    ];


    absoluteFormGroup: FormGroup;
    absoluteFormData: AutoFormData = {
        type: 'simple',
        items: [
            {
                name: 'rangeDate',
                type: 'object',
                properties: [
                    {
                        name: 'absoluteRange',
                        displayName: 'Range',
                        type: 'date',
                        subtype: {
                            name: 'date-range',
                        },
                    },
                ],
            },
            {
                name: 'time',
                type: 'object',
                properties: [
                    {
                        name: 'startingTime',
                        type: 'string',
                        displayName: 'Start Date time',
                        component: timeFieldComponent,
                        errors: {
                            hours: {
                                text: 'Errooror de minutes',
                            },
                        },
                    },
                    {
                        name: 'endingTime',
                        type: 'string',
                        displayName: 'Ending time',
                        component: timeFieldComponent,
                    },
                ],
            },
        ],
        actionsButtons: {},
        event: {
            afterFormCreated: (fg) => (this.absoluteFormGroup = fg),
            submit: (value: any) => {
                const from = value.rangeDate.absoluteRange.start;
                const to = value.rangeDate.absoluteRange.end;
                this.timeSelected.next({
                    from,
                    to,
                });
                return of({});
            },
            initialData: () =>
                of({
                    rangeDate: {
                        absoluteDate: {
                            start: this.interval?.from,
                            end: this.interval?.to,
                        },
                    },
                }),
        },
    };

    relativeFormGroup: FormGroup;
    relativeFormData: AutoFormData = {
        type: 'simple',
        actionsButtons: {},
        items: [
            {
                name: 'object',
                type: 'object',
                decorators: {
                    class: ['frow'],
                },
                templates: {
                },
                properties: [
                    {
                        name: 'timeSpan',
                        type: 'number',
                        displayName: 'Unit',
                    },
                    {
                        name: 'unit',
                        type: 'string',
                        displayName: 'Unit',
                        component: {
                            name: 'select',
                            type: 'mat',
                            options: {
                                displayName: 'Unit',
                                displayContent: (e) => e,
                                options: {
                                    value: () =>
                                        of([
                                            'Month',
                                            'Hours',
                                            'Minutes',
                                            'Date',
                                        ]),
                                },
                            },
                        } as any,
                    },
                ],
            },
            {
                name: 'update',
                type: 'object',
                properties: [
                    {
                        name: 'live',
                        type: 'bool',
                        displayName: 'live update ?',
                        component: {
                            name: 'checkbox',
                        },
                    },
                ],
            },
        ],
        event: {
            submit: (value: any) => {
                this.timeSelected.next({
                    lastX: value.object.timeSpan,
                    lastXUnit: value.object.unit,
                    liveUpdate: value.update.live ? true : false,
                });
                return of({});
            },
            afterFormCreated: (formGroup) => {
                this.relativeFormGroup = formGroup;
            },
            initialData: () =>
                of({
                    object: {
                        timeSpan: this.interval?.lastX ?? 2,
                        unit: this.interval?.lastXUnit ?? 'Hours',
                    },
                }),
        },
    };

    @Input()
    set mode(m: 'relative' | 'absolute') {
        this.tabIndex = m === 'relative' ? 0 : 1;
    }

    ngOnInit(): void {}

    presetSelect(lastX: number, lastXUnit: string) {
        this.relativeFormGroup.patchValue({
            object: {
                timeSpan: lastX,
                unit: lastXUnit,
            },
        });
    }


    getValue() {
      return (this.tabIndex === 0) ? this.relativeFormGroup.value : this.absoluteFormGroup.value;
    }
}
