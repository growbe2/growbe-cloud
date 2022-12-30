import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { fuseAnimations } from '@berlingoqc/fuse';

import pkg from '../../../../package.json';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    //animations: fuseAnimations,
})
export class LoginComponent implements OnInit {
    version = pkg.version;

    constructor(public router: Router) {}

    ngOnInit(): void {}
}
