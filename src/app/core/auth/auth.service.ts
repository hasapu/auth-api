import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

const url = environment.url;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private _http: HttpClient
  ) { }

  public isAuthenticate(): boolean {
    const allowLogin = localStorage.getItem('authData');
    if (allowLogin) { return true; } else { return false; }
  }

  async login(data: any) {
    return await this._http.post(url + '/login', data, httpOptions)
      .pipe(
        map(result => result),
        catchError(err => throwError(err)))
      .toPromise()
      .then(response => response)
      .catch(err => err);
  }

  logout(onLogout: boolean) {
    if (onLogout) {
      this.router.navigate(['login'])
      localStorage.removeItem('authData');
    }
  }
}
