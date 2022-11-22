import {IProperty, SelectComponent} from "@berlingoqc/ngx-autoform";
import {BehaviorSubject, map, of} from "rxjs";

export function getCloudLogSearchForm(typeLog: string): IProperty[] {
    let subjectChange = new BehaviorSubject('');

    let groups = ['mainboard', 'modules'];

    let type = {
      'device': {
        'mainboard': [
            ['Comboards', 'comboard'],
            ['State', 'mainboardstate'],
            ['Plateform', 'plateform'],
            ['Socket', 'socket'],
            ['Store', 'store']
        ],
        'modules': [
            ['Relays', 'relay'],
            ['Actors', 'actor'],
            ['Alarms', 'alarm'],
        ]
      },
      'cloud': {
        'unknown': [],
        'mainboard': [
                            ['Mainboard connection change', 'connection'],
                            ['Mainboard RTC change', 'update_rtc'],
                            ['Mainboard sync request', 'sync_request'],
                            ['Mainboard config change', 'growbe_config'],
        ],
        'modules': [
                            ['Module state change', 'module'],
                            ['Module config change', 'module_config'],
                            ['Module Alarm Event', 'alarm'],
        ],
      }
    }


    return [
        {
            name: 'group',
            type: 'string',
            decorators: {
                component: {
                    class: ['full', 'pad'],
                },
            },
            component: {
                name: 'select',
                type: 'mat',
                noneOption: {
                    type: 'string',
                    content: '--',
                },
                transformValue: (e) => e,
                options: {
                    displayTitle: '',
                    displayContent: (e) => e,
                    value: () => of(groups), // need to filter if for module
                },
            } as SelectComponent,
            valuesChanges: (control, value) => subjectChange.next(value),
        },
        {
            name: 'type',
            type: 'string',
            decorators: {
                component: {
                    class: ['full', 'pad'],
                },
            },
            component: {
                name: 'select',
                type: 'mat',
                noneOption: {
                    type: 'string',
                    content: '--',
                },
                transformValue: (e) => e[1],
                options: {
                    displayTitle: '',
                    displayContent: (e) => e[0],
                    value: () => subjectChange.pipe(map(x => {
                        return type[typeLog][x] || [];
                    }))
                },
            } as SelectComponent,
        },
        {
            name: 'message',
            type: 'string',
            displayName: 'Message Regex',
            decorators: {
                component: {
                    class: ['full', 'pad'],
                },
            },
        }
    ];
}


