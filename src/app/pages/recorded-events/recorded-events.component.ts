import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ReceivedEventService} from '../../services/crud/received-event.service';
import {CurrentEvent} from '../../dtos/floor_plan/current-event';
import {DatePipe} from '@angular/common';
import {isDate} from 'moment';
import {ListSearchService} from '../../services/system/list-search.service';
import {ListSortService} from '../../services/system/list-sort.service';

@Component({
  selector: 'app-recorded-events',
  templateUrl: './recorded-events.component.html',
  styleUrls: ['./recorded-events.component.css'],
  providers: [DatePipe]
})
export class RecordedEventsComponent implements OnInit, AfterViewInit, OnDestroy {
  sortBy = '';
  sortType = 'asc';
  listSearchSubject;

  modelFrom = new Date(new Date().setDate(new Date().getDate() - 1 ));
  modelTo = new Date();

  inputDate = null;

  private currentEvents: CurrentEvent[] = [];

  constructor(private service: ReceivedEventService,
              private listSortService: ListSortService,
              public datepipe: DatePipe,
              private listSearchService: ListSearchService) { }

  ngOnInit(): void {
    this.refresh();
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
           .applySearchFilter(this.currentEvents, searchVaule,
               ['category', 'uid', 'userid', 'timestamp', 'name', 'source', 'description'] );
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

  refresh() {
    const modelFromString = this.datepipe.transform(this.modelFrom, 'yyyy-MM-ddTHH:mm:00.000');
    const modelToString = this.datepipe.transform(this.modelTo, 'yyyy-MM-ddTHH:mm:00.000');
    this.service.getByDate(modelFromString, modelToString).subscribe(data => {
      this.currentEvents = data;
    });
  }
}
