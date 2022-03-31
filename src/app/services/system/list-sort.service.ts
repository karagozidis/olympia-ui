import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListSortService {

  constructor() { }

  applySort(currentEvents: any[], sortBy: string, sortType: string) {

    currentEvents.sort((a, b) => {
      const fieldType = typeof a[sortBy];
      let shortTypeInd = 1;
      if (sortType === 'desc') { shortTypeInd = -1; }

      if (fieldType === 'string') {
        const nameA = a[sortBy].toUpperCase();
        const nameB =  b[sortBy].toUpperCase();
        if (nameA < nameB) {
          return -1 * shortTypeInd;
        }
        if (nameA > nameB) {
          return 1 * shortTypeInd;
        }
        return 0;
      } else if (fieldType === 'number') {
        return (a[sortBy] - b[sortBy]) * shortTypeInd;
      }
      return 0;
    });

  }
}
