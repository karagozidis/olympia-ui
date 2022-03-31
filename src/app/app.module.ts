import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './shared/login/login.component';
import { InstallationComponent } from './pages/installation/installation.component';
import { FloorPlansComponent } from './pages/floor-plans/floor-plans.component';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SettingsComponent } from './shared/settings/settings.component';
import {FormsModule} from '@angular/forms';
import {AuthenticationHeaderInterceptor} from './interceptors/authentication-header.interceptor';

import {HttpRequestLoadingInterceptor} from './interceptors/http-request-loading.interceptor';
import { RecordedEventsComponent } from './pages/recorded-events/recorded-events.component';
import { DatePipe } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CurrentEventsComponent } from './pages/current-events/current-events.component';
import { DatePickerComponent } from './form-controls/date-picker/date-picker.component';
import {NgxMaskModule} from 'ngx-mask';
import { WirelessDevicesComponent } from './pages/wireless-devices/wireless-devices.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    InstallationComponent,
    FloorPlansComponent,
    SettingsComponent,
    RecordedEventsComponent,
    CurrentEventsComponent,
    DatePickerComponent,
    WirelessDevicesComponent
  ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes, {
            useHash: true
        }),
        SidebarModule,
        NavbarModule,
        ToastrModule.forRoot(),
        FooterModule,
        FixedPluginModule,
        FormsModule,
        NgbModule,
        NgxMaskModule.forRoot()
    ],
  providers: [
      DatePipe,
      {provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationHeaderInterceptor,
      multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: AuthenticationHeaderInterceptor, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: HttpRequestLoadingInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
