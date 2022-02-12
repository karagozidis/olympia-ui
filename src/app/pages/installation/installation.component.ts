import {Component, OnInit} from '@angular/core';
import configs from './../../../../config.json';

@Component({
    selector: 'app-installation',
    templateUrl: './installation.component.html',
    styleUrls: ['./installation.component.css']
})
export class InstallationComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    readFileTest() {
        alert(JSON.stringify(configs[0]));
    }
}
