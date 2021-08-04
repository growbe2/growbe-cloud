import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '@berlingoqc/auth';
import { AutoFormData, FormProperty } from '@berlingoqc/ngx-autoform';
import { unsubscriber } from '@berlingoqc/ngx-common';
import { CRUDDataSource } from '@berlingoqc/ngx-loopback';
import { GrowbeMainboard } from '@growbe2/ngx-cloud-api';
import { of, Subscription } from 'rxjs';
import { GrowbeMainboardAPI } from '../../api/growbe-mainboard';

export type GrowbeTableMode = 'user' | 'org' | 'admin';

@Component({
    selector: 'app-growbe-manager-dashboard',
    templateUrl: './growbe-manager-dashboard.component.html',
    styleUrls: ['./growbe-manager-dashboard.component.scss'],
})
@unsubscriber
export class GrowbeManagerDashboardComponent implements OnInit {
    private modeKey = 'growbeTableMode';
    source: CRUDDataSource<GrowbeMainboard>;

    sub: Subscription;

    autoFormData: AutoFormData = {
        type: 'simple',
        items: [
            {
                type: 'object',
                name: 'object',
                properties: [],
            },
        ],
        actionsButtons: {},
        event: {
            initialData: {
                object: {
                    value: JSON.parse(localStorage.getItem(this.modeKey) ?? '{"mode": "user"}'),
                },
            },
            submit: () => of(),
            afterFormCreated: (fg) => {
                this.sub = fg.valueChanges.subscribe((value) => {
                    localStorage.setItem(this.modeKey, JSON.stringify(value.object.value));
                    this.source = this.getSource(value.object.value);
                });
            },
        },
    };

    value: any;

    constructor(
        public authService: AuthService,
        public growbeMainboardAPI: GrowbeMainboardAPI,
    ) {}

    ngOnInit(): void {
        this.autoFormData.items[0].properties[0] = {
            name: 'value',
            type: 'string',
            displayName: '',
            component: {
                name: 'select',
                type: 'mat',
                options: {
                    displayTitle: '',
                    displayContent: (e) => e.name,
                    options: {
                        value: () => {
                            const items = [{ name: 'My growbe', mode: 'user' }];
                            if (this.authService.isAdmin) {
                                items.push({
                                    name: 'Admin mode',
                                    mode: 'admin',
                                });
                            }
                            if (this.authService.profile.organisations) {
                              items.push(
                                ...this.authService.profile.organisations.map((org) => ({name: org.name, mode: 'org', extra: org.id}))
                              );
                            }
                            return of(items);
                        },
                    },
                },
                compareWith: (obj1, obj2) => obj1.mode === obj2?.mode,
            } as any,
        };
        this.source = this.getSource({mode: 'user'});
    }

    private getSource(value: any) {
        this.value = value;
        switch (value.mode) {
            case 'admin':
                return this.growbeMainboardAPI;
            case 'org':
                return this.growbeMainboardAPI.orgGrowbeMainboard(value.extra);
            case 'user':
            default:
                return this.growbeMainboardAPI.userGrowbeMainboard(
                    this.authService.profile.id,
                );
        }
    }
}
