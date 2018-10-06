import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.view.html'
})

export class ToolbarComponent implements OnInit{
  authData;
  login: boolean;
  @Output() onLogout: EventEmitter<any> = new EventEmitter()
  constructor(
    private _authService: AuthService
  ) {}
  ngOnInit() {
    this.authData = JSON.parse(localStorage.getItem('authData' ));
    if (this.authData) {
      this.login = true;
    } else {
      this.login = false;
    }
  }
  logout(): void {
    this._authService.logout(true);
  }
}
