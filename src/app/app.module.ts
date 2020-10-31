import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DetailsOcrPageComponent } from './details-ocr-page/details-ocr-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular';
import { MatTabsModule } from '@angular/material/tabs';
//import { AgGridModule } from 'ag-grid-angular';
import {FileUploadModule} from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardPageComponent,
    DetailsOcrPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    MatTabsModule,
    FileUploadModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
