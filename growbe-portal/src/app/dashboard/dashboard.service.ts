import { Observable } from 'rxjs';
import { ProjectDashboard, Dashboard, DashboardItem } from './dashboard.model';

export interface AddItemToPanelRequest {
    dashboardId: string;
    data: DashboardItem;
    atIndex?: number;
}

export abstract class DashboardService {
    // Retourne la liste des dashboards existants
    abstract getDashboards(): Observable<Dashboard[]>;
    abstract addPanelToDasboard(
        data: AddItemToPanelRequest,
    ): Observable<Dashboard>;
}
