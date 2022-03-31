import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListSearchService {

  public listSearchEmmiter: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.listSearchEmmiter = new EventEmitter();
  }

  applySearchFilter(currentEvents: any[], searchVaule: string, searchFields: string[]) {

      currentEvents.forEach(currentEvent => {
        let valueFound = false;

        for (const key of Object.keys(currentEvent)) {
          let value = '';
          if (searchFields.includes(key)) {
            value = (currentEvent[key] == null ? '' : currentEvent[key]);
          }

          if (value.toString().toUpperCase().includes(searchVaule.toUpperCase()) || searchVaule === '') {
            valueFound = true;
          }

          if (valueFound) {
            currentEvent['hide-row'] = false;
          } else {
            currentEvent['hide-row'] = true;
          }
        }
      });

  }
}
