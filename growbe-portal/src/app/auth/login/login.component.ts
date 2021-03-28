import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { version } from '../../../../package.json';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  version = version;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
