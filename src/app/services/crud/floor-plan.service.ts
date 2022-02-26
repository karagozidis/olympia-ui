import { Injectable } from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {FloorPlanEntry} from '../../dtos/floor_plan/floor-plan-entry';

@Injectable({
  providedIn: 'root'
})
export class FloorPlanService extends CrudService<any>  {

  constructor(public http: HttpClient) {
    super(http, 'FloorPlan');
  }

  public getList(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}`);
  }

  public getFullObjs(): Observable<FloorPlanEntry[]> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/GetFullObjs`);
  }
}
