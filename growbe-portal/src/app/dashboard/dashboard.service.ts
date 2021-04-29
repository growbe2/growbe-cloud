import { Observable } from "rxjs";
import { ProjectDashboard, Dashboard } from "./dashboard.model";




export abstract class DashboardService {
  // Retourne la liste des dashboards existants
  abstract getDashboards(): Observable<Dashboard[]>;
  abstract addPanelToDasboard(): Observable<Dashboard>;
}
