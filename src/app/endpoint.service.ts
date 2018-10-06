import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import { map, catchError,  } from 'rxjs/operators';
import { throwError } from 'rxjs';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  constructor(
    private _http: HttpClient
  ) { }

  authHeader() {
    const authData =  JSON.parse(localStorage.getItem('authData'));
    if (authData) {
      return {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': authData.session
        })
      };
    }
  }

  async  getData(path) {
    return this._http.get(url + path, await this.authHeader() )
      .pipe(
        map(result => result),
        catchError(err => throwError(err)))
      .toPromise()
      .then(response => response)
      .catch(err => err);
  }

  async postData(path, data) {
    return this._http.post(url + path, data, await this.authHeader())
      .pipe(
        map(result => result),
        catchError(err => throwError(err)))
      .toPromise()
      .then(response => response)
      .catch(err => err);
  }
}
