import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './shared/login/login.component';

export const AppRoutes: Routes = [
  {
    path: '',
    // component: LoginComponent
    redirectTo: 'pages/login',
    pathMatch: 'full',
  },
  {
    path: 'pages/login',
    component: LoginComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]}
  // {
  //   path: '**',
  //   redirectTo: 'dashboard'
  // }
]
