import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {


  @Input() inputDate: Date;
  @Output() inputDateChange = new EventEmitter<Date>();
  @Input() editable: Boolean;
  @Output() keyDownChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() fieldClass: any;
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() eventOccured = new EventEmitter<any>();

  @ViewChild('ngbDatepickerIdentifier') ngbInputDatepicker: NgbInputDatepicker;
  model: string;
  convertedMask: String = '';
  @Input() mask = '';

  timeModel: string;
  constructor(element: ElementRef,
              private renderer: Renderer2,
              private _parserFormatter: NgbDateParserFormatter,
              public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.setMaskFormatFromDateFormat();
    this.inputDateToModel();
  }

  setMaskFormatFromDateFormat() {
    const DExp = /D/gi;
    const MExp = /M/gi;
    const YExp = /Y/gi;
    this.convertedMask = this.mask.toUpperCase().replace(DExp, '0').replace(MExp, '0').replace(YExp, '0');
  }

  onKeyDownEvent(event: KeyboardEvent) {

    if (event.key === 'Enter') {
      this.ngbInputDatepicker.toggle();
    }

    if (event.ctrlKey && event.key === 'z') {
      // alert(JSON.stringify(this.inputDate));
    }

    this.keyDownChange.emit(event);
  }

  onNgbDatepickerSelection(ngbDate: NgbDateStruct) {

    let hour = 0;
    let minute = 0;
    if ( (this.timeModel == null ? '' : this.timeModel).length === 4) {
      hour =  Number(this.timeModel.substring(0, 2));
      minute = Number(this.timeModel.substring(2, 4));
    }

    this.inputDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day, hour, minute);
    this.inputDateToModel();
  }

  inputDateToModel() {
    if (this.inputDate === null) {
      return;
    }
    const dateStringFormated = this.datepipe.transform(this.inputDate, this.mask);

    const exp = /\/|\\|-/gi;
    this.model = dateStringFormated.replace(exp, '');

    this.timeModel = this.datepipe.transform(this.inputDate, 'HHmm');
  }

  onFocusOut() {
    try {
      const modelParsedToDate = this.tryModelToDate();
      if (modelParsedToDate === false) {
        this.model = '';
        this.timeModel = '';
        this.inputDate = null;
      } else {
        const dateStringFormated = this.datepipe.transform(this.inputDate, this.mask);
        const exp = /\/|\\|-/gi;
        this.model = dateStringFormated.replace(exp, '');
        this.timeModel = this.datepipe.transform(this.inputDate, 'HHmm');
      }
    } catch (error) {
      this.model = '';
      this.timeModel = '';
      this.inputDate = null;
    }
    this.inputDateChange.emit(this.inputDate);
  }

  tryModelToDate() {
    const currentDate = new Date();

    const exp = /\/|\\|-/gi;
    const modelFormat = this.mask.replace(exp, '');

    const fistIndexOfD = modelFormat.indexOf('d');
    const lastIndexOfD = modelFormat.lastIndexOf('d');

    const fistIndexOfM = modelFormat.indexOf('M');
    const lastIndexOfM = modelFormat.lastIndexOf('M');

    const fistIndexOfY = modelFormat.indexOf('y');
    const lastIndexOfY = modelFormat.lastIndexOf('y');

    const day: number = +this.model.substring(fistIndexOfD, lastIndexOfD + 1);
    let month: number = +this.model.substring(fistIndexOfM, lastIndexOfM + 1);
    let year: number = +this.model.substring(fistIndexOfY, lastIndexOfY + 1);

    let hour = 0;
    let minute = 0;
    if ( (this.timeModel == null ? '' : this.timeModel).length === 4) {
      hour =  Number(this.timeModel.substring(0, 2));
      minute = Number(this.timeModel.substring(2, 4));
    }

    if (day <= 0) {
      return false;
    }

    if (month <= 0) {
      month = currentDate.getMonth() + 1;
    }

    if (year <= 0) {
      year = currentDate.getFullYear();
    }

    if (hour > 23 ) {
      hour = 23;
    }

    if (minute > 59) {
      minute = 59;
    }

    this.inputDate = new Date(year, month - 1, day, hour, minute);
    return true;
  }

  focusTriggered($event: FocusEvent) {
    this.focusEvent.emit($event);
  }

  eventOccuredActions(eventtype: string, event: any) {


    this.eventOccured.emit(
        {
          eventtype: eventtype,
          event: event
        }
    );
  }

}
