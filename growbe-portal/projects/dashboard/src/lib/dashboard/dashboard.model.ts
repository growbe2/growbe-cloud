import { InjectionToken } from '@angular/core';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { TemplateContent } from '@berlingoqc/ngx-common';

import { Observable } from 'rxjs';


export const DASHBOARD_REF = new InjectionToken<Dashboard>('reference of the dashboard');
export const DASHBOARD_ITEM_REF = new InjectionToken<Dashboard>('reference of the dashboard item');

export interface Style {
    class?: string[]; //string | string[] | {[id: string]: boolean}
    style?: { [id: string]: string };
}

export interface DashboardItem {
    id?: number;
    name?: TemplateContent;
    header?: TemplateContent;
    component: string;
    inputs: { [id: string]: any };
    outputs: { [id: string]: (obs: Observable<any>) => void };
    copy: boolean;
    edit?: AutoFormData;
    dashboardEdit?: boolean;
    disableMenu?: boolean;
    extraMenus?: {[id: string]: { callback: (self: DashboardItem) => void, name: string }}
}

export interface DashboardPanel extends Style {
    name: string;
    items: (DashboardItem & Style)[];
}

export interface Dashboard {
    id: string;
    name: string;
    layout: string;
    static: boolean;
    disablePanelBar: boolean;
    // Dashboard is a collection of panel
    panels: DashboardPanel[];
}

export interface ProjectDashboard extends Dashboard {
    // sideBar with a panel in it
    sidePanel?: DashboardPanel;
}

export interface FullDashboard extends Dashboard {

}
