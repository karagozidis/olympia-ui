import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CrudService} from './common/crud.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends CrudService<any> {
  constructor(public http: HttpClient) {
    super(http, 'Person');
  }

  login(username, password): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(environment.serverUrl + '/' + this.endpoint + '/Login', {
      'userName': username,
      'password': password
    }, httpOptions);
  }

}
