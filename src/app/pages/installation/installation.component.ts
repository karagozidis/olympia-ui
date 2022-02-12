import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-installation',
    templateUrl: './installation.component.html',
    styleUrls: ['./installation.component.css']
})
export class InstallationComponent implements OnInit {

    // dataJson: Observable<unknown>;
    // dynamicallyLoadJsonFile = import('./../../../assets/config.json');

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
    }

    readFileTest() {

        //
        // this.http.get('./../../../assets/config.json').subscribe(
        //     data => {
        //         alert(JSON.stringify(data));
        //     }
        // )
        // alert(JSON.stringify(configs[0]));

        // const  moduleSpecifier = './config.json'
        // import(moduleSpecifier).then((data) => {
        //     alert(JSON.stringify(data));
        // }).catch(error => {
        //     alert(error.message)
        // });

        // const data = fromPromise(this.dynamicallyLoadJsonFile);
        // alert(JSON.stringify(data));

        // import('./../../../assets/config.json').then(data => {
        //     alert(JSON.stringify(data));
        // });

    }


}
