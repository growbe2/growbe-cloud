import { Observable, Subject } from 'rxjs';
import { Dashboard, DashboardItem, DashboardPanel, Style } from './dashboard.model';

export interface DashboardRef {
    dashboardId: string;
}

export interface PanelDashboardRef extends DashboardRef {
    panelName: string;
}

export interface PanelItemRef extends PanelDashboardRef {
    itemName: string;
}

export abstract class DashboardService {
    dashboardSubject = new Subject();
    // Retourne la liste des dashboards existants
    abstract getDashboards(): Observable<Dashboard[]>;

    // add a new panel to a dashboard
    abstract addPanelToDasboard(
        dashboard: DashboardRef,
        panel: DashboardPanel,
        element?: string,
    ): Observable<Dashboard>;
    abstract addItemToPanelDashboard(
        panel: PanelDashboardRef,
        item: DashboardItem,
    ): Observable<Dashboard>;


    abstract updateItemFromPanel(panel: PanelDashboardRef,item: DashboardItem & Style, index?: number): Observable<Dashboard>;

    abstract removeItemFromPanel(item: PanelItemRef): Observable<Dashboard>;
    abstract removePanelFromDashboard(
        panel: PanelDashboardRef,
    ): Observable<Dashboard>;
    abstract removeDashboard(dashboard: DashboardRef): Observable<void>;
}
