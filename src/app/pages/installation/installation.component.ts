import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

declare var electron: any;

@Component({
    selector: 'app-installation',
    templateUrl: './installation.component.html',
    styleUrls: ['./installation.component.css']
})
export class InstallationComponent implements OnInit, OnDestroy {
    electronEventHandler;

    constructor(private http: HttpClient, private _ngZone: NgZone) {

        this.electronEventHandler = (event, arg) => {
                this._ngZone.run(() => {
                    const reply = `Asynchronous message reply: ${arg}`;
                    console.log(reply);
                });
        };


    }

    ngOnInit(): void {
        electron.ipcRenderer.on('asynchronous-reply', this.electronEventHandler);
    }

    ngOnDestroy(): void {
        electron.ipcRenderer.removeListener('asynchronous-reply', this.electronEventHandler);
    }


    readFileTest() {
       electron.ipcRenderer.send('asynchronous-message', 'ping');
    }



}
