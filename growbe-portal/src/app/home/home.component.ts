import { Component, OnInit } from '@angular/core';
import { AuthService } from '@berlingoqc/auth';
import { Dashboard } from '@growbe2/growbe-dashboard';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    defaultDashboard: Dashboard;

    constructor(public authService: AuthService) {}

    ngOnInit(): void {}
}
