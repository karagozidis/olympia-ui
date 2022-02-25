import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

/**
 * A convenience CRUD service to be extended by concrete services to provide default CRUD methods.
 */
export class CrudService<T> {


  constructor(public http: HttpClient, protected endpoint: string) {
  }

  save(object: T) {
    return this.http.post(`${environment.serverUrl}/${this.endpoint}`, object);
  }

  update(object: T) {
    return this.http.put(`${environment.serverUrl}/${this.endpoint}`, object);
  }

  get(): Observable<T> {
    return this.http.get<T>(`${environment.serverUrl}/${this.endpoint}/`);
  }

  getById(id: any): Observable<T> {
    return this.http.get<T>(`${environment.serverUrl}/${this.endpoint}/by-id?id=${id}`);
  }

  getFirst(): Observable<T> {
    return this.http.get<T>(`${environment.serverUrl}/${this.endpoint}`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${environment.serverUrl}/${this.endpoint}?id=${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${environment.serverUrl}/${this.endpoint}`);
  }
}
