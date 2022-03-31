import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon: 'fa-home fas',       class: '' },
    { path: '/floor-plans',   title: 'Floor Plans',       icon: 'fa-solid fa-object-group',    class: '' },
    { path: '/cur-events',    title: 'Current Events',    icon: 'fa-solid fa-circle-exclamation',      class: '' },
    { path: '/rec-events',    title: 'Recorded Events',   icon: 'fa-solid fa-calendar-days',    class: '' },
    { path: '/wless-devices', title: 'Wireless Devices',  icon: 'fa-solid fa-tower-broadcast',  class: '' },
    { path: '/installation',  title: 'Installation',      icon: 'fa-solid fa-folder-plus',    class: '' },
    { path: '/user',          title: 'Settings',          icon: 'fa-solid fa-gears',  class: 'active-pro' },
];
@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
