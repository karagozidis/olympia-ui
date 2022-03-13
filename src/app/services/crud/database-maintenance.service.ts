import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CrudService} from './common/crud.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseMaintenanceService extends CrudService<any> {
  constructor(public http: HttpClient) {
    super(http, 'DatabaseMaintenance');
  }

  public getAllStatusPropsForMasterPanel(): Observable<any> {
    return this.http.get<any>(`${localStorage.getItem('server_url')}/${this.endpoint}/GetAllStatusProps/1`);
  }

}
