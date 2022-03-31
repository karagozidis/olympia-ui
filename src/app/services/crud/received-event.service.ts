import { Injectable } from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CurrentEvent} from '../../dtos/floor_plan/current-event';

@Injectable({
  providedIn: 'root'
})
export class ReceivedEventService extends CrudService<any> {
  constructor(public http: HttpClient) {
    super(http, 'ReceivedEvent');
  }

  public get(): Observable<CurrentEvent[]> {
    return this.http.get<any>(`${localStorage.getItem('server_url')}/${this.endpoint}`);
  }

  public getByDate(from, to): Observable<CurrentEvent[]> {
    return this.http.get<any>(`${localStorage.getItem('server_url')}/${this.endpoint}/GetWithMasterPanelName/1?dateTimeNowMinus=${from}&dateTimeNow=${to}`);
  }

}
