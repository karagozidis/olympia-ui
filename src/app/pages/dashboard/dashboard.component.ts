import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatabaseMaintenanceService} from '../../services/crud/database-maintenance.service';
import {interval, Subscription} from 'rxjs';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

    public canvas: any;
    public ctx;
    public chartColor;
    public chartEmail;
    public chartHours;

    public statusProps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    subscription: Subscription;

    constructor(private service: DatabaseMaintenanceService ) {
    }

    ngOnInit() {
        this.getAllStatusPropsForMasterPanel();
        const source = interval(2000);
        this.subscription = source.subscribe(val => this.getAllStatusPropsForMasterPanel());
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getAllStatusPropsForMasterPanel() {
        this.service.getAllStatusPropsForMasterPanel().subscribe(data => {
            this.statusProps = data;
        });
    }

}
