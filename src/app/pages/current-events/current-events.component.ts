import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CurrentEvent} from '../../dtos/floor_plan/current-event';
import {ReceivedEventService} from '../../services/crud/received-event.service';
import {ListSortService} from '../../services/system/list-sort.service';
import {ListSearchService} from '../../services/system/list-search.service';

@Component({
  selector: 'app-current-events',
  templateUrl: './current-events.component.html',
  styleUrls: ['./current-events.component.css']
})
export class CurrentEventsComponent implements OnInit, AfterViewInit, OnDestroy {
  sortBy = '';
  sortType = 'asc';
  listSearchSubject;

  private currentEvents: CurrentEvent[] = [];

  constructor(private service: ReceivedEventService,
              private listSortService: ListSortService,
              private listSearchService: ListSearchService) { }

  ngOnInit(): void {
    this.service.get().subscribe(data => {
      this.currentEvents = data;
    });
  }

  ngAfterViewInit() {
    this.applyHeaderSearchFilter();
  }

  ngOnDestroy() {
    this.listSearchSubject.unsubscribe();
  }

  applyHeaderSearchFilter() {
    this.listSearchSubject = this.listSearchService.listSearchEmmiter.subscribe((searchVaule: string) => {
      this.listSearchService
          .applySearchFilter(this.currentEvents, searchVaule, ['uid', 'timestamp', 'name', 'source', 'description'] );
    });
  }

  filterHiddenRows(listContent): CurrentEvent[] {
    if (listContent == null) {
      return null;
    }

    return listContent.filter( x => {
      if (x['hide-row'] === true) {
        return false;
      } else {
        return true;
      }
    });
  }

  short(sortBy: string) {

    if (sortBy === this.sortBy && this.sortType === 'asc') {
      this.sortType = 'desc';
    } else if (sortBy === this.sortBy && this.sortType === 'desc') {
      this.sortType = 'asc';
    } else {
      this.sortBy = sortBy;
      this.sortType = 'asc';
    }

    this.listSortService.applySort(this.currentEvents, this.sortBy, this.sortType );
  }

}
