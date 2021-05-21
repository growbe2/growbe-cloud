import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { Observable } from 'rxjs';

export interface Style {
    class?: string[]; //string | string[] | {[id: string]: boolean}
    style?: { [id: string]: string };
}

export interface DashboardItem {
    name: string;
    component: string;
    inputs: { [id: string]: any };
    outputs: { [id: string]: (obs: Observable<any>) => void };
    copy: boolean;
    edit?: AutoFormData;
}

export interface DashboardPanel extends Style {
    name: string;
    items: (DashboardItem & Style)[];
}

export interface Dashboard {
    id: string;
    name: string;
    // Dashboard is a collection of panel
    panels: DashboardPanel[];
}

export interface ProjectDashboard extends Dashboard {
    // sideBar with a panel in it
    sidePanel?: DashboardPanel;
}
