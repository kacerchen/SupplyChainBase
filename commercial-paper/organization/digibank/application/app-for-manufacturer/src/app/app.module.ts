import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProcessMgComponent } from './process-mg/process-mg.component';
import { ProductMgComponent } from './product-mg/product-mg.component';
import { ProcurementMgComponent } from './procurement-mg/procurement-mg.component';
import { LogisticsMgComponent } from './logistics-mg/logistics-mg.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProcessMgComponent,
    ProductMgComponent,
    ProcurementMgComponent,
    LogisticsMgComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
