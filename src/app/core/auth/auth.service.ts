import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable }              from '@angular/core';
import { Router }                  from '@angular/router';

import { throwError }      from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment }     from '../../../environments/environment';
import { EndpointService } from '../../endpoint.service';

const url = environment.url;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private _http: HttpClient,
    private _authHeader: EndpointService
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

  async logout() {
    const logout = await this._http.get(url + '/logout', await this._authHeader.authHeader())
                             .pipe(
                               map(result => result),
                               catchError(err => throwError(err)))
                             .toPromise()
                             .then(response => response)
                             .catch(err => err);

    if (logout.status === 'success') {
      this.router.navigate(['login']);
      localStorage.removeItem('authData');
    } else {
      console.log(logout.message);
    }
  }

  register(data) {
    return this._http.post(url + '/register', data, httpOptions);
  }
}
