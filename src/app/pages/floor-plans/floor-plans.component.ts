import { Component, OnInit } from '@angular/core';
import {FloorPlanService} from '../../services/crud/floor-plan.service';
import {FloorPlanEntry} from '../../dtos/floor_plan/floor-plan-entry';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-floor-plans',
  templateUrl: './floor-plans.component.html',
  styleUrls: ['./floor-plans.component.css']
})
export class FloorPlansComponent implements OnInit {
test = '';
  private floorPlanEntries: FloorPlanEntry[];
  private curFloorPlanEntry: FloorPlanEntry = null;
  url;

  constructor(private service: FloorPlanService, private sanitizer: DomSanitizer) { }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (evnt: ProgressEvent<FileReader> ) => {
        this.url = evnt.target.result;
        alert(this.url);
      }
    }
  }

  ngOnInit(): void {
    this.service.getFullObjs().subscribe(data => {
      this.floorPlanEntries = data;
      if (this.floorPlanEntries.length > 0) {
        this.curFloorPlanEntry = this.floorPlanEntries[0];
      }
    });
  }

  trustImageResource(backimage) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + backimage);
  }

  edit(floorPlanEntry: FloorPlanEntry) {
    this.curFloorPlanEntry = floorPlanEntry;
  }

  saveNew() {
  }
}
