import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import {InstallationComponent} from '../../pages/installation/installation.component';
import {FloorPlansComponent} from '../../pages/floor-plans/floor-plans.component';
import {RecordedEventsComponent} from '../../pages/recorded-events/recorded-events.component';
import {CurrentEventsComponent} from '../../pages/current-events/current-events.component';
import {WirelessDevicesComponent} from '../../pages/wireless-devices/wireless-devices.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'installation',   component: InstallationComponent },
    { path: 'wless-devices',  component: WirelessDevicesComponent },
    { path: 'floor-plans',    component: FloorPlansComponent },
    { path: 'rec-events',     component: RecordedEventsComponent },
    { path: 'cur-events',     component: CurrentEventsComponent },
];
