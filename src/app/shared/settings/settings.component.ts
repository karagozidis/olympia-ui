import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {AppConfig} from '../../dtos/app_config/app-config';
import {Router} from '@angular/router';

declare var electron: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  appConfigResponceEventHandler;
  appConfig: AppConfig = new AppConfig();

  constructor(private _ngZone: NgZone,
              private router: Router) {
    this.appConfigResponceEventHandler = (event, appConfig) => {
      this._ngZone.run(() => {
        this.appConfig = appConfig;
        console.log(this.appConfig);
      });
    };
  }

  ngOnInit(): void {
    electron.ipcRenderer.on('app-config-response', this.appConfigResponceEventHandler);
    electron.ipcRenderer.send('app-config-request', 'appConfig');
  }

  ngOnDestroy(): void {
    electron.ipcRenderer.removeListener('app-config-response', this.appConfigResponceEventHandler);
  }

  save() {
    electron.ipcRenderer.send('app-config-update', this.appConfig);
    this.router.navigateByUrl('/');
  }
}
