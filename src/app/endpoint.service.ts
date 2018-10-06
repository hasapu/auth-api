import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import { map, catchError,  } from 'rxjs/operators';
import { throwError } from 'rxjs';

const url = environment.url;
const authData =  JSON.parse(localStorage.getItem('authData'));

let httpOptions = {}

if (authData) {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': authData.session
    })
  };
}

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  constructor(
    private _http: HttpClient
  ) { }

  getData(path) {
    return this._http.get(url + path, httpOptions)
      .pipe(
        map(result => result),
        catchError(err => throwError(err)))
      .toPromise()
      .then(response => response)
      .catch(err => err);
  }

  postData(path, data) {
    return this._http.post(url + path, data, httpOptions)
      .pipe(
        map(result => result),
        catchError(err => throwError(err)))
      .toPromise()
      .then(response => response)
      .catch(err => err);
  }
}
